<script setup lang="ts">
import { useChatsStore } from '@app/store/chats.store'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { useAuthStore } from '@app/store/auth.store'

const route = useRoute()

const id = route.path.split('chat/')[1]

if (!id) {
  throw new Error('Chat ID is required')
}

const chat = useChatsStore().chats.find((c) => c.id === id)

if (!chat) {
  throw new Error(`Chat with id ${id} not found`)
}

const messagesStore = useChatMessagesStore(id)()

const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  throw new Error('User must be authenticated to view chat messages')
}

const chatContainerRef = ref<HTMLElement | null>(null)

onUpdated(() => {
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTo({
      top: chatContainerRef.value.scrollHeight,
      behavior: 'smooth',
    })
  }
})
</script>

<template>
  <div
    ref="chatContainerRef"
    class="flex flex-col gap-8 chat-container mx-auto rounded-xl min-h-full"
  >
    <template
      v-for="message in messagesStore.messages"
      v-if="messagesStore.messages.length"
      :key="message.id"
    >
      <Message v-bind="message" />
    </template>
    <div v-else class="flex items-center justify-center h-full">
      <Text as="p" variant="bodyMd" tone="muted">No messages yet.</Text>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 768px;
}
</style>
