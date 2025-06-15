<script setup lang="ts">
import { useChatsStore } from '@app/store/chats.store'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { useAuthStore } from '@app/store/auth.store'

const route = useRoute()

const id = route.path.split('chat/')[1]

if (!id) {
  throw new Error('Chat ID is required')
}

const chat = useChatsStore().chats.find(c => c.id === id)

if (!chat) {
  throw new Error(`Chat with id ${id} not found`)
}

const messagesStore = useChatMessagesStore(id)()

const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  throw new Error('User must be authenticated to view chat messages')
}
</script>

<template>
  <div>
    <template v-if="messagesStore.messages.length" v-for="message in messagesStore.messages" :key="message.id">
      <Message v-bind="message" />
    </template>
    <div v-else class="flex items-center justify-center h-full">
      <p class="text-muted">No messages yet. Start the conversation!</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
