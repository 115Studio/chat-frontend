import type { Subscription } from 'rxjs';
import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { filter, map, takeUntil, share } from 'rxjs/operators'
import { useWebSocket as vueUseWebSocket } from '@vueuse/core'
import { watch } from 'vue'
import type { WebSocketOpCode } from '@app/constants/web-socket-op-code'

export interface WebSocketMessage<K extends string = string, T = any> {
  op: WebSocketOpCode
  data: { [key in K]: T }
}

export interface WebSocketState {
  connected: boolean
  error: Error | null
  reconnectAttempts: number
}

// Singleton storage
let webSocketInstance: ReturnType<typeof createWebSocketInstance> | null = null
let currentUrl: string | null = null
let currentJwt: string | null = null

export const createWebSocketInstance = (url: string, jwt: string) => {
  const destroy$ = new Subject<void>()

  const { data, status, open, close, send, ws } = vueUseWebSocket(
    `${url}?auth=${jwt}`,
    {
      autoReconnect: {
        retries: 50,
        delay: 3000,
        onFailed() {
          console.error('Failed to connect WebSocket after 100500 retries')
        }
      },
      immediate: true,
      autoClose: true,
      onConnected: (socket) => {
        console.log('WebSocket VueUse connection opened')
      },
      onDisconnected: (socket, event) => {
        console.log('WebSocket VueUse connection closed')
      },
      onError: (socket, error) => {
        console.error('WebSocket VueUse error:', error)
      }
    }
  )

  const state$ = new BehaviorSubject<WebSocketState>({
    connected: false,
    error: null,
    reconnectAttempts: 0
  })

  const messages$ = new Subject<WebSocketMessage>()

  watch(status, (newStatus) => {
    const currentState = state$.value
    state$.next({
      ...currentState,
      connected: newStatus === 'OPEN',
      error: newStatus === 'CLOSED' ? new Error('WebSocket connection closed') : null
    })
  }, { immediate: true })

  watch(data, (newData) => {
    if (newData) {
      try {
        const message: WebSocketMessage = JSON.parse(newData)
        messages$.next(message)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }
  })

  const connection$ = new Observable<Event>(subscriber => {
    const unwatch = watch(status, (newStatus) => {
      if (newStatus === 'OPEN') {
        subscriber.next(new Event('open'))
        subscriber.complete()
        unwatch()
      } else if (newStatus === 'CLOSED') {
        subscriber.complete()
        unwatch()
      }
    }, { immediate: true })

    return () => unwatch()
  }).pipe(
    share(),
    takeUntil(destroy$)
  )

  const getMessagesByOpCode = (opCode: WebSocketOpCode): Observable<WebSocketMessage> => {
    return messages$.pipe(
      filter(msg => msg.op === opCode),
      takeUntil(destroy$)
    )
  }

  const connect = (): Observable<Event> => {
    if (status.value !== 'OPEN') {
      open()
    }
    return connection$
  }

  const sendMessage = <K extends string = string, T = any>(
    message: WebSocketMessage<K, T>
  ): boolean => {
    if (status.value !== 'OPEN') {
      console.error('Cannot send message: WebSocket is not connected')
      return false
    }

    try {
      const messageString = JSON.stringify(message)
      send(messageString)
      return true
    } catch (error) {
      console.error('Failed to send WebSocket message:', error)
      return false
    }
  }

  const destroy = () => {
    destroy$.next()
    destroy$.complete()
    close()
    // Reset singleton when destroyed
    webSocketInstance = null
    currentUrl = null
    currentJwt = null
  }

  return {
    state$: state$.asObservable(),
    messages$: messages$.asObservable(),
    connection$,

    connect,
    sendMessage,
    getMessagesByOpCode,
    destroy,

    get isConnected() {
      return status.value === 'OPEN'
    },

    get socket() {
      return ws.value
    }
  }
}

export const useWebSocket = (url: string, jwt: string) => {
  // Check if we already have an instance with the same parameters
  if (webSocketInstance && currentUrl === url && currentJwt === jwt) {
    return webSocketInstance
  }

  // If parameters changed or no instance exists, create new one
  if (webSocketInstance) {
    webSocketInstance.destroy()
  }

  webSocketInstance = createWebSocketInstance(url, jwt)
  currentUrl = url
  currentJwt = jwt

  return webSocketInstance
}

export const subscribeOp = <K extends string = string, T = any>(
  websocket: ReturnType<typeof useWebSocket>,
  opCode: WebSocketOpCode,
  callback: (data: { [key in K]: T }) => void
): Subscription => {
  return websocket.getMessagesByOpCode(opCode).subscribe({
    next: (message) => {
      callback(message.data as any)
    },
    error: (error) => {
      console.error(`Error in subscription for opCode ${opCode}:`, error)
    }
  })
}
