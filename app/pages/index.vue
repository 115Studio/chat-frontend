<script setup lang="ts">
import { useAuthStore } from '@app/store/auth.store'
import { useChatsStore } from '@app/store/chats.store'
import { createMessage } from '@app/composables/api'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import { AiModel } from '@app/constants/ai-model'
import { toast } from 'vue-sonner'
import { useChatMessagesStore } from '@app/store/chat-messages.store'

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatsStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

setPageLayout('sidebar')

const input = ref('')

const createMessageEvent = async () => {
  const response = await createMessage(
    authStore.jwt,
    '@new',
    [
      {
        type: MessageStageType.Text,
        content: {
          type: MessageStageContentType.Text,
          value: input.value,
        }
      }
      // TODO add uploaded files
    ],
    { // TODO model settings
      id: AiModel.OpenaiGpt4o,
      flags: [],
    }
    // TODO personality settings
  )

  if (!response.ok) {
    return toast.error('Failed to create message')
  }

  const { channel, userMessage, systemMessage } = response.result

  chatStore.createChat(channel)

  const messages = useChatMessagesStore(channel.id)()
  messages.addMessage(userMessage)
  messages.addMessage(systemMessage)

  return router.push('/chat/' + channel.id)
}

// const createNewChat = () => {
//   const chat = chatStore.createChat(input.value)
//   input.value = ''
//
//   if (chat) router.push(`/chat/${chat.id}`)
//   else toast.error('Failed to create chat')
// }
</script>

<template>
  <div class="page-container">
    <div class="page-content mx-auto mt-40 w-full items-center text-center">
      <Text as="h1" variant="headingXl"> Hello, {{ authStore.name }}! </Text>
      <div class="top-content mt-20">
        <ChatInput v-model="input" @create-message-event="createMessageEvent" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.page-content {
  flex: 1;
}

.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 292px;
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  min-height: 400px; /* Adjust height as needed */
}

.container__group-item {
  margin-bottom: 18px;
}

.bottom-content {
  margin-top: auto;
}

.top-content {
  margin-bottom: auto;
}

.row {
  &__group {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 12px;

    &.skeleton {
      @include mixins.skeleton(128px, 16px, 4px);
    }
  }
}
</style>
