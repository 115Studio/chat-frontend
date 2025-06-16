<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFilesStore } from '@app/store/files.store'
import { normalizeAbsoluteLeaves, resolveMessageStageContentType, resolveMessageStageType } from '@app/lib/utils'
import { Inputs, useInputsStore } from '@app/store/useInputsStore'
import { debounce } from '@app/lib/debouce'
import { useWebSocket } from '@app/composables/use-web-socket'
import { wsApi } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'
import { WebSocketOpCode } from '@app/constants/web-socket-op-code'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'

const chatId = useRoute().params.id as string | undefined

const store = useFilesStore(chatId ?? '@new')()
const inputsStore = useInputsStore(chatId ?? '@new')()

const emit = defineEmits<{
  (e: 'createMessageEvent'): void
}>()

const model = ref('')
const incommingMessage = ref()

const fileInput = ref<HTMLInputElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const imagesToShow = computed(() => {
  return store.files
    .filter((file) => file.type.startsWith('image/'))
    .map((file) => ({
      url: file.url,
      id: file.internalId,
      name: file.name,
    }))
})

const filesToShow = computed(() => {
  return store.files
    .filter((file) => !file.type.startsWith('image/'))
    .map((file) => ({
      id: file.internalId,
      name: file.name,
    }))
})

const processFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  for (const file of Array.from(input.files)) {
    store.addFile(file)
  }

  input.value = ''
}

const createMessage = () => {
  if (model.value!.trim().length === 0 && store.files.length === 0) {
    toast.error('Please enter a message or attach a file.')
    return
  }
  emit('createMessageEvent')
}

const onPaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        store.addFile(file)
        event.preventDefault()
      }
    }
  }
}

const resizeTextarea = () => {
  if (!textareaRef.value) return

  textareaRef.value.style.height = '28px'

  if (textareaRef.value.scrollHeight > 28) {
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}

const syncMessages = debounce(() => {
  const files = store.files.map((file) => ({
    type: resolveMessageStageType(file.type),
    content: {
      type: resolveMessageStageContentType(file.type),
      value: `${file.id}::${file.type}::${file.url}`,
    },
  }))

  const ws = useWebSocket(wsApi(), useAuthStore().jwt)

  void ws.sendMessage({
    op: WebSocketOpCode.SyncInput,
    data: {
      channelId: chatId,
      stages: [
        {
          type: MessageStageType.Text,
          content: {
            type: MessageStageContentType.Text,
            value: model.value,
          },
        },
        ...files,
      ],
    },
  })
}, 1)

const receivingMessages = ref(false)

watch(model, () => {
  console.log('model changed', receivingMessages.value, model.value)

  nextTick(() => {
    resizeTextarea()
  })

  if (receivingMessages.value) return

  syncMessages()
})

watch(() => store.files, () => {
  console.log('files changed', receivingMessages.value, store.files)
  if (receivingMessages.value) return
  syncMessages()
}, { deep: true })

watch(() => inputsStore.inputs.get(Inputs.ChatInput), () => {
  receivingMessages.value = true

  const chatInput = inputsStore.getInput(Inputs.ChatInput)
  if (chatInput?.stages)
    model.value = chatInput.stages.find((s: any) => s.type === MessageStageType.Text)?.content?.value || ''
  else
    model.value = ''

  const images = chatInput?.stages
    .filter((s: any) => [MessageStageType.Vision, MessageStageType.File].includes(s.type))
    .map((s: any) => {
      const [id, type, url] = s.content?.value?.split('::') ?? []
      return {
        id,
        type,
        url: url || '',
      }
    }) || []

  store.clearFiles()

  for (const image of images) {
    if (!store.files.some((f) => f.internalId === image.id)) {
      store.addExisting({
        id: image.id,
        url: image.url,
        type: image.type,
        name: image.id,
      })
    }
  }

  setTimeout(() => {
    receivingMessages.value = false
  }, 3)
}, { immediate: true })
</script>

<template>
  <div class="chat-input-container" @paste="onPaste">
    <div class="input-container">
      <textarea
        ref="textareaRef"
        v-model="model"
        class="input"
        type="text"
        placeholder="Ask anything"
        @keydown.enter.exact.prevent="() => createMessage()"
        @keydown.enter.shift.exact.prevent="model += '\n'"
      />
      <input
        ref="fileInput"
        type="file"
        accept="image/*, text/*, application/pdf, application/json"
        class="hidden"
        @change="processFileInput"
      >
    </div>
    <div class="relative overflow-x-auto max-w-full">
      <transition-group
        name="fade-insert"
        tag="div"
        class="flex flex-row gap-3"
        @before-leave="normalizeAbsoluteLeaves"
      >
        <ChatInputImage
          v-for="file in imagesToShow"
          :id="file.id"
          :key="file.id"
          :image="file.url"
          alt="Attached file"
          class="max-h-24 rounded-lg flex-shrink-0"
        />
        <ChatInputFile v-for="file in filesToShow" :id="file.id" :key="file.id" :name="file.name" />
      </transition-group>
    </div>
    <div class="chat-input-actions">
      <div class="chat-input-actions__left">
        <button type="button" class="voice-button">Voice</button>
        <button type="button" class="clear-button">Clear</button>
        <button type="button" class="settings-button">Settings</button>
      </div>
      <div class="chat-input-actions__right">
        <button type="button" @click="toast('This is a toast message!')">Toast!</button>
        <button type="button" class="send-button" @click="createMessage()">Send</button>
        <button type="button" class="attach-button" @click="$refs.fileInput!.click()">
          Attach
        </button>
        <button type="button" class="emoji-button">♥️</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-input-container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  margin-right: auto;
  margin-left: auto;
  max-width: 768px;
  padding: 28px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  min-height: 104px;
  max-height: 284px;
}

.input-container {
  flex-grow: 1;
}

.input {
  width: 100%;
  height: 28px;
  min-height: 24px;
  max-height: 128px;
  padding: 2px 0;
  border: 1px solid var(--color-border-default);
  border-radius: 0;
  font-size: 18px;
  background: none;
  resize: none;
  overflow-y: hidden;
  line-height: 1.25;

  @apply focus:outline-none focus:ring-0;
}

.chat-input-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;

  &__left {
    display: flex;
    gap: 8px;
  }

  &__right {
    display: flex;
    gap: 8px;
  }

  button {
    @apply transition-opacity duration-200 ease-in-out;
    &:hover {
      @apply opacity-60;
    }
  }
}

.fade-insert-move,
.fade-insert-enter-active,
.fade-insert-leave-active {
  transition:
    opacity 0.4s ease-in-out,
    transform 0.4s ease-in-out;
}
.fade-insert-leave-active {
  position: absolute;
}
.fade-insert-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.fade-insert-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.1);
}

.fade-insert-enter-to,
.fade-insert-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
