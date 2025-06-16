<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold mb-8">WebSocket RxJS Demo</h1>

    <!-- Connection Status -->
    <div
class="p-6 rounded-lg shadow-sm flex flex-col"
         :class="connectionState.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
      <h2 class="font-semibold text-lg mb-2 pl-3">Connection Status</h2>
      <p class="mb-1">{{ connectionState.connected ? 'Connected' : 'Disconnected' }}</p>
      <p v-if="connectionState.error" class="mb-1">Error: {{ connectionState.error.message }}</p>
      <p>Reconnect attempts: {{ connectionState.reconnectAttempts }}</p>
    </div>

    <!-- Controls -->
    <div class="flex gap-4">
      <button
class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
              :disabled="!connectionState.connected"
              @click="toggleMessageSubscription">
        {{ messageSubscribed ? 'Unsubscribe from' : 'Subscribe to' }} All Messages
      </button>
    </div>

    <!-- All Messages -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">All Messages</h2>
      <div class="bg-gray-50 p-6 rounded-lg h-80 overflow-y-auto border">
        <div
v-for="message in allMessages"
:key="message.id"
             class="mb-4 p-4 bg-white rounded-lg border-l-4 shadow-sm"
             :class="getOpCodeColor(message.opCode)">
          <div class="text-sm text-gray-500 mb-2 font-medium">
            {{ formatTime(message.timestamp) }} - OpCode: {{ message.opCode }}
          </div>
          <div class="font-mono text-sm bg-gray-50 p-3 rounded overflow-x-auto">
            {{ JSON.stringify(message.data, null, 2) }}
          </div>
        </div>
        <div v-if="allMessages.length === 0" class="text-gray-500 text-center py-8">
          No messages yet. {{ messageSubscribed ? 'Waiting for messages...' : 'Subscribe to receive all WebSocket messages.' }}
        </div>
      </div>
    </div>

    <!-- Connection Log -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Connection Log</h2>
      <div class="bg-gray-900 text-green-400 p-6 rounded-lg h-48 overflow-y-auto font-mono text-sm border">
        <div v-for="log in connectionLogs" :key="log.id" class="mb-1">
          <span class="text-gray-500">{{ formatTime(log.timestamp) }}</span>
          <span class="ml-2">{{ log.message }}</span>
        </div>
        <div v-if="connectionLogs.length === 0" class="text-gray-500 text-center py-8">
          No logs yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import type { Subscription } from 'rxjs'
import { useWebSocket, type WebSocketMessage, type WebSocketState } from '../composables/use-web-socket'
import { useAuthStore } from '@app/store/auth.store'

// WebSocket instance
let ws: ReturnType<typeof useWebSocket> | null = null
const subscriptions = new Set<Subscription>()

// Reactive state
const connectionState = reactive<WebSocketState>({
  connected: false,
  error: null,
  reconnectAttempts: 0
})

const allMessages = ref<Array<{id: string, opCode: number, data: any, timestamp: number}>>([])
const connectionLogs = ref<Array<{id: string, message: string, timestamp: number}>>([])

const messageSubscribed = ref(false)

// Helper function to format timestamps
const formatTime = (timestamp?: number) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString()
}

// Helper function to get color based on opcode
const getOpCodeColor = (opCode: number) => {
  const colors = [
    'border-blue-500',
    'border-green-500',
    'border-purple-500',
    'border-orange-500',
    'border-red-500',
    'border-pink-500',
    'border-indigo-500',
    'border-yellow-500'
  ]
  return colors[opCode % colors.length]
}

// Helper function to add connection log
const addLog = (message: string) => {
  connectionLogs.value.unshift({
    id: crypto.randomUUID(),
    message,
    timestamp: Date.now()
  })
  // Keep only last 20 logs
  if (connectionLogs.value.length > 20) {
    connectionLogs.value = connectionLogs.value.slice(0, 20)
  }
}

// Initialize WebSocket connection
const initializeWebSocket = () => {
  try {
    addLog('🔄 Initializing WebSocket connection...')

    const config = useRuntimeConfig()

    // Initialize WebSocket (replace with your actual URL and JWT)
    ws = useWebSocket(
      config.public.ws,
      useAuthStore().jwt
    )

    // Subscribe to connection state changes
    const stateSubscription = ws.state$.subscribe((state: WebSocketState) => {
      Object.assign(connectionState, state)
      if (state.connected) {
        addLog('✅ WebSocket connected')
        // Auto-subscribe to messages when connected
        if (!messageSubscribed.value) {
          toggleMessageSubscription()
        }
      } else {
        addLog('❌ WebSocket disconnected')
        if (state.error) {
          addLog(`❗ Error: ${state.error.message}`)
        }
      }
    })
    subscriptions.add(stateSubscription)

    // Subscribe to connection establishment
    const connectionSubscription = ws.connection$.subscribe({
      next: () => {
        addLog('🔌 Connection established successfully')
      },
      error: (error: any) => {
        addLog(`🚨 Connection failed: ${error}`)
      }
    })
    subscriptions.add(connectionSubscription)

  } catch (error) {
    addLog(`💥 Failed to initialize WebSocket: ${error}`)
  }
}

// Keep track of message subscription
let messageSubscription: Subscription | null = null

// Toggle message subscription to all opcodes
const toggleMessageSubscription = () => {
  if (!ws?.isConnected) {
    addLog('⚠️ Cannot subscribe: WebSocket not connected')
    return
  }

  if (messageSubscribed.value && messageSubscription) {
    messageSubscription.unsubscribe()
    messageSubscription = null
    messageSubscribed.value = false
    addLog('🔇 Unsubscribed from all messages')
  } else {
    // Subscribe to all messages (no filter by opcode)
    messageSubscription = ws.messages$.subscribe((message: WebSocketMessage) => {
      allMessages.value.unshift({
        id: crypto.randomUUID(),
        opCode: message.op,
        data: message.data,
        timestamp: Date.now()
      })
      // Keep only last 50 messages
      if (allMessages.value.length > 50) {
        allMessages.value = allMessages.value.slice(0, 50)
      }
      addLog(`📨 Message received - OpCode: ${message.op}`)
    })
    messageSubscribed.value = true
    addLog('🔔 Subscribed to all messages')
  }
}

// Cleanup on component unmount
onUnmounted(() => {
  addLog('🧹 Cleaning up subscriptions...')

  // Clean up general subscriptions
  subscriptions.forEach(sub => sub.unsubscribe())

  // Clean up message subscription
  messageSubscription?.unsubscribe()

  // Destroy WebSocket
  ws?.destroy()

  addLog('✨ Component unmounted, all subscriptions cleaned up')
})

// Auto-initialize when component mounts
onMounted(() => {
  initializeWebSocket()
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
