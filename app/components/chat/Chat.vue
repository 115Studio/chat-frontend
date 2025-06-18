<script setup lang="ts">
import { useChatsStore } from '@app/store/chats.store'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { useAuthStore } from '@app/store/auth.store'
import { toast } from 'vue-sonner'
import type { Message } from '@app/types'

const emit = defineEmits<{
  (e: 'scroll-down'): void
}>()

const route = useRoute()

const id = computed(() => {
  return route.params.id ?? '@new'
})

if (!id.value) {
  toast.error(`Chat Id is required`)
  useRouter().push('/')
}

const chat = computed(() => {
  return useChatsStore().chats.find((c) => c.id === id.value)
})

if (!chat.value) {
  if (id.value !== '@new') {
    toast.error(`Chat with id ${id.value} not found`)
    useRouter().push('/')
  }
}

const messagesStore = computed(() => {
  return useChatMessagesStore(id.value as string)()
})

const groupedMessages = computed(() => {
  const messages = messagesStore.value.messages
  if (!messages.length) return []

  // Group messages by groupId
  const messageGroups = new Map<string, Message[]>()
  
  for (const message of messages) {
    if (!messageGroups.has(message.groupId)) {
      messageGroups.set(message.groupId, [])
    }
    messageGroups.get(message.groupId)!.push(message)
  }

  // Get the latest message from each group along with the earliest message for sorting
  const groupResults: { latest: Message, earliest: Message }[] = []
  
  for (const group of messageGroups.values()) {
    const latestMessage = group.reduce((latest, current) => {
      const latestTime = latest.updatedAt ?? latest.createdAt
      const currentTime = current.updatedAt ?? current.createdAt
      return currentTime > latestTime ? current : latest
    })
    
    const earliestMessage = group.reduce((earliest, current) => {
      return current.createdAt < earliest.createdAt ? current : earliest
    })
    
    groupResults.push({ latest: latestMessage, earliest: earliestMessage })
  }

  // Sort by the earliest message's creation time in each group
  return groupResults
    .sort((a, b) => a.earliest.createdAt - b.earliest.createdAt)
    .map(result => result.latest)
})

const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  throw new Error('User must be authenticated to view chat messages')
}

onUpdated(() => {
  emit('scroll-down')
})
</script>

<template>
  <div class="flex flex-col gap-2 chat-container mx-auto rounded-xl">
    <template
      v-for="message in groupedMessages"
      v-if="groupedMessages.length"
      :key="message.id"
    >
      <Message v-bind="message" class="message" />
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

  @media (max-width: 768px) {
    max-width: 90vw;
  }
}

.message {
  @apply mx-4;

  @media (max-width: 768px) {
    @apply mx-2;
  }
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
