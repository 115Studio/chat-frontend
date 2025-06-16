<script setup lang="ts">
import { useAuthStore } from '@app/store/auth.store'
import { useFilesStore } from '@app/store/files.store'
import { resolveMessageStageContentType, resolveMessageStageType } from '@app/lib/utils'
import { createMessage, getChannelMessages } from '@app/composables/api'
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

const shadowTop = ref(true)
const shadowBottom = ref(false)
const pageContentRef = ref<HTMLElement | null>(null)

const updateShadows = () => {
  const el = pageContentRef.value
  if (!el) return

  shadowTop.value = el.scrollTop <= 0
  shadowBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight
}

onMounted(() => {
  if (pageContentRef.value) {
    pageContentRef.value.addEventListener('scroll', updateShadows)
    updateShadows() // Initial check
  }
})

onUnmounted(() => {
  if (pageContentRef.value) {
    pageContentRef.value.removeEventListener('scroll', updateShadows)
  }
})

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

onMounted(async () => {
  const store = useChatMessagesStore(chatId)()

  const messages = await getChannelMessages(useAuthStore().jwt, chatId)

  if (messages.ok) {
    store.syncMessagesWithBackend(messages.result.messages)
  } else {
    console.error('Failed to fetch messages:', messages.errors)
  }
})

definePageMeta({
  layout: 'sidebar'
})
</script>

<template>
  <div class="page-container">
    <div
      ref="pageContentRef"
      class="page-content scrollbar-hide h-full"
      :class="{
        'page-content--shadow-top': shadowTop,
        'page-content--shadow-bottom': shadowBottom,
      }"
    >
      <Chat class="mt-20 mb-16" />
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
  height: 100svh;
  padding-bottom: 12px;
}

.page-container {
  position: relative;
}

.page-content {
  flex: 1;
  overflow-y: scroll;
}

.page-container::before,
.page-container::after {
  content: '';
  position: absolute;
  left: 20px;
  right: 20px;
  height: 40px;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.page-container::before {
  top: 20px;
  background: linear-gradient(to bottom, var(--color-bg) 0%, var(--color-bg) 20%, transparent 100%);
}

.page-container::after {
  bottom: 0;
  background: linear-gradient(to top, var(--color-bg) 0%, var(--color-bg) 20%, transparent 100%);
}

.page-content--shadow-top + .bottom-content::before {
  opacity: 0;
}

.page-content--shadow-bottom + .bottom-content::after {
  opacity: 0;
}

.page-container:has(.page-content--shadow-top)::before {
  opacity: 0;
}

.page-container:has(.page-content--shadow-bottom)::after {
  opacity: 0;
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
