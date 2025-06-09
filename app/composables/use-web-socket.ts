import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs'
import { filter, map, takeUntil, share } from 'rxjs/operators'
import { useWebSocket as vueUseWebSocket } from '@vueuse/core'
import { watch } from 'vue'
import type { WebSocketOpCode } from '@app/constants/web-socket-op-code'

export interface WebSocketMessage<T = any> {
  op: WebSocketOpCode
  data: { [key: string]: T }
}

export interface WebSocketState {
  connected: boolean
  error: Error | null
  reconnectAttempts: number
}

export const useWebSocket = (url: string, jwt: string) => {
  const destroy$ = new Subject<void>()

  const { data, status, open, close, ws } = vueUseWebSocket(
    `${url}?auth=${jwt}`,
    {
      autoReconnect: {
        retries: 5,
        delay: 3000,
        onFailed() {
          console.error('Failed to connect WebSocket after 5 retries')
        }
      },
      heartbeat: true,
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

  const destroy = () => {
    destroy$.next()
    destroy$.complete()
    close()
  }

  return {
    state$: state$.asObservable(),
    messages$: messages$.asObservable(),
    connection$,

    connect,
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

export const subscribeOp = <T = any>(
  websocket: ReturnType<typeof useWebSocket>,
  opCode: WebSocketOpCode,
  callback: (data: { [key: string]: T }) => void
): Subscription => {
  return websocket.getMessagesByOpCode(opCode).subscribe({
    next: (message) => {
      callback(message.data)
    },
    error: (error) => {
      console.error(`Error in subscription for opCode ${opCode}:`, error)
    }
  })
}
