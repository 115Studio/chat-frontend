<script setup lang="ts">
import { useAuthStore } from '@app/store/auth.store'
import { useFilesStore } from '@app/store/files.store'
import { resolveMessageStageContentType, resolveMessageStageType } from '@app/lib/utils'
import { createMessage } from '@app/composables/api'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import { AiModel } from '@app/constants/ai-model'
import { toast } from 'vue-sonner'
import { useChatMessagesStore } from '@app/store/chat-messages.store'

const router = useRouter()
const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

const chatId = useRoute().params.id as string

const input = ref('')

const createMessageEvent = async () => {
  const files = useFilesStore(chatId)().files.map((file) => ({
    type: resolveMessageStageType(file.type),
    content: {
      type: resolveMessageStageContentType(file.type),
      value: file.id,
    },
  }))

  const response = await createMessage(
    authStore.jwt,
    chatId,
    [
      {
        type: MessageStageType.Text,
        content: {
          type: MessageStageContentType.Text,
          value: input.value,
        },
      },
      ...files,
    ],
    {
      // TODO model settings
      id: AiModel.OpenaiGpt4o,
      flags: [],
    },
    // TODO personality settings
  )

  if (!response.ok) return toast.error('Failed to create message')

  input.value = ''
  useFilesStore(chatId)().clearFiles()

  const { channel, userMessage, systemMessage } = response.result

  const messages = useChatMessagesStore(channel.id)()
  messages.addMessage(userMessage)
  messages.addMessage(systemMessage)
}

setPageLayout('sidebar')
</script>

<template>
  <div class="page-container">
    <div class="page-content scrollbar-hide h-full">
      <Chat />
    </div>
    <div class="bottom-content max-h-content">
      <ChatInput v-model="input" @create-message-event="createMessageEvent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.page-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-height: 91svh;
}

.page-content {
  overflow-y: scroll;
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
