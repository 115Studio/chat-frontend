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
    <div v-else>
      <!-- User message skeletons (right aligned) -->
      <div class="skeleton skeleton-user skeleton-user-medium"></div>

      <div class="separator"></div>

      <!-- AI message skeletons (left aligned) -->
      <div class="skeleton skeleton-ai skeleton-ai-long"></div>

      <div class="separator"></div>

      <!-- More user messages -->
      <div class="skeleton skeleton-user skeleton-user-short"></div>

      <div class="separator"></div>

      <!-- More AI messages -->
      <div class="skeleton skeleton-ai"></div>
      <div class="skeleton skeleton-ai skeleton-ai-image"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/mixins';

.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 768px;
}

.separator {
  margin-bottom: 32px;
}

.skeleton {
  max-width: 768px;
  padding: 8px 14px;
  border-radius: 16px;
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  margin-bottom: 12px;
  height: 24px;

  &-user {
    margin-left: auto;
    margin-right: 0;
    @include mixins.skeleton(45%, 40px, 24px);

    &-short {
      @include mixins.skeleton(25%, 40px, 24px);
    }

    &-medium {
      @include mixins.skeleton(35%, 40px, 24px);
    }
  }

  &-ai {
    margin-right: auto;
    margin-left: 0;
    @include mixins.skeleton(55%, 40px, 24px);

    &-short {
      @include mixins.skeleton(30%, 40px, 24px);
    }

    &-medium {
      @include mixins.skeleton(45%, 40px, 24px);
    }

    &-long {
      @include mixins.skeleton(65%, 120px, 24px);
    }

    &-image {
      @include mixins.skeleton(40%, 200px, 24px);
    }
  }
}
</style>
