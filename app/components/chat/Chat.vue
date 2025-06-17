<script setup lang="ts">
import { useChatsStore } from '@app/store/chats.store'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { useAuthStore } from '@app/store/auth.store'
import { toast } from 'vue-sonner'

const emit = defineEmits<{
  (e: 'scroll-down'): void
}>()

const route = useRoute()

const id = route.path.split('chat/')[1] ?? '@new'

if (!id) {
  toast.error(`Chat Id is required`)
  useRouter().push('/')
}

const chat = useChatsStore().chats.find((c) => c.id === id)

if (!chat) {
  toast.error(`Chat with id ${id} not found`)
  useRouter().push('/')
}

const messagesStore = useChatMessagesStore(id)()

const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  throw new Error('User must be authenticated to view chat messages')
}

onUpdated(() => {
  emit('scroll-down')
})
</script>

<template>
  <div class="flex flex-col gap-8 chat-container mx-auto rounded-xl">
    <template
      v-for="message in messagesStore.messages"
      v-if="messagesStore.messages.length"
      :key="message.id"
    >
      <Message v-bind="message" class="ml-3 mr-3" />
    </template>
    <div v-else>
      <!-- User message skeletons (right aligned) -->
      <div class="skeleton skeleton-user skeleton-user-medium" />

      <div class="separator" />

      <!-- AI message skeletons (left aligned) -->
      <div class="skeleton skeleton-ai skeleton-ai-long" />

      <div class="separator" />

      <!-- More user messages -->
      <div class="skeleton skeleton-user skeleton-user-short" />

      <div class="separator" />

      <!-- More AI messages -->
      <div class="skeleton skeleton-ai" />
      <div class="skeleton skeleton-ai skeleton-ai-image" />
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
