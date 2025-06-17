<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFilesStore } from '@app/store/files.store'
import {
  normalizeAbsoluteLeaves,
  resolveMessageStageContentType,
  resolveMessageStageType, resolveModelIcon,
  resolveModelName, resolveReasoningLevel
} from '@app/lib/utils'
import { Inputs, useInputsStore } from '@app/store/inputs.store'
import { debounce } from '@app/lib/debouce'
import { useWebSocket } from '@app/composables/use-web-socket'
import { wsApi } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'
import { WebSocketOpCode } from '@app/constants/web-socket-op-code'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import ChangeModel from '@app/components/chat/ChangeModel.vue'
import { PhPaperclip, PhPaperPlaneRight } from '@phosphor-icons/vue'
import Button from '@app/components/global/Button.vue'
import { allowedTypes } from '@app/constants/allowed-file-types'

const chatId = useRoute().params.id as string | undefined

const store = useFilesStore(chatId ?? '@new')()
const inputsStore = useInputsStore(chatId ?? '@new')()

const emit = defineEmits<{
  (e: 'createMessageEvent'): void
}>()

const model = ref('')

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
    if (allowedTypes.includes(item.type)) {
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
}, 200)

const receivingMessages = ref(false)
const writingSelf = ref(false)

watch(model, () => {
  saveToStore()

  nextTick(() => {
    resizeTextarea()
  })

  if (receivingMessages.value) return

  syncMessages()
})

watch(() => store.files, () => {
  saveToStore()
  if (receivingMessages.value) return
  syncMessages()
}, { deep: true })

watch(() => inputsStore.inputs[Inputs.ChatInput], () => {
  if (writingSelf.value) return

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

  // store.clearFiles()

  const existing = []

  for (const file of store.files) {
    if (images.some((i: any) => i.id === file.id)) {
      existing.push(file.id)
    } else {
      store.removeFile(file.id!)
    }
  }

  for (const image of images) {
    if (!existing.includes(image.id)) {
      store.addExisting({
        id: image.id,
        type: image.type,
        url: image.url,
        name: image.id
      })
    }
  }

  setTimeout(() => {
    receivingMessages.value = false
  }, 3)
})

const saveToStore = () => {
  const files = store.files
    .filter(file => !file.isUploading)
    .map((file) => ({
    type: resolveMessageStageType(file.type),
    content: {
      type: resolveMessageStageContentType(file.type),
      value: `${file.id}::${file.type}::${file.url}`,
    },
  }))

  writingSelf.value = true

  inputsStore.writeInput(Inputs.ChatInput, {
    stages: [
      {
        type: MessageStageType.Text,
        content: {
          type: MessageStageContentType.Text,
          value: model.value,
        },
      },
      ...files,
    ]
  })

  setTimeout(() => {
    writingSelf.value = false
  }, 3)
}

onMounted(() => {
  const chatInput = inputsStore.getInput(Inputs.ChatInput)
  if (chatInput?.stages)
    model.value = chatInput.stages.find((s: any) => s.type === MessageStageType.Text)?.content?.value || ''
  else
    model.value = ''

  store.checkStore()
})
</script>

<template>
  <div class="chat-input-container" @paste="onPaste">
    <div class="relative overflow-x-auto max-w-full" :class="{ 'mb-4': store.files.length > 0 }">
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
    <div class="input-container">
      <textarea
        ref="textareaRef"
        v-model="model"
        class="input"
        type="text"
        placeholder="Ask anything"
        @keydown.enter.exact.prevent="() => createMessage()"
      />
      <input
        ref="fileInput"
        type="file"
        accept="image/*, text/*, application/pdf, application/json"
        class="hidden"
        @change="processFileInput"
      >
    </div>
    <div class="chat-input-actions">
      <div class="chat-input-actions__left">
        <Button size="sm" class="max-w-4" @click="fileInput?.click()">
          <PhPaperclip size="20" />
        </Button>
        <ChangeModel v-model="model" class="w-fit" tooltip-disabled>
          <Button weight="normal" size="sm">
            <component :is="resolveModelIcon(inputsStore.getInput(Inputs.SelectedModel)?.model)" class="w-4 h-4" />
            {{ resolveModelName(inputsStore.getInput(Inputs.SelectedModel)?.model) }}

            {{ resolveReasoningLevel(inputsStore.getInput(Inputs.ReasoningLevel)?.level) }}
          </Button>
        </ChangeModel>
      </div>
      <div class="chat-input-actions__right">
        <Button size="md" class="button__send" @click="createMessage()">
          <PhPaperPlaneRight size="20" />
        </Button>
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
  padding: 28px 28px 24px 28px;
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
  padding: 2px 0 0 6px;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  &__left {
    display: flex;
    gap: 8px;
  }

  &__right {
    display: flex;
    gap: 8px;
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
