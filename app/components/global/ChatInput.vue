<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFilesStore } from '@app/store/files.store'
import { normalizeAbsoluteLeaves } from '@app/lib/utils'

const chatId = useRoute().params.id as string | undefined

const store = useFilesStore(chatId ?? '@new')()

const emit = defineEmits<{
  (e: 'createMessageEvent'): void
}>()

const model = defineModel<string>()

const fileInput = ref<HTMLInputElement | null>(null)

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
</script>

<template>
  <div class="chat-input-container" @paste="onPaste">
    <div class="input-container">
      <textarea
        v-model="model"
        class="input"
        type="text"
        placeholder="Ask anything"
        @keydown.enter.exact.prevent="(e) => createMessage(e)"
        @keydown.enter.shift.exact.prevent="model += '\n'"
      />
      <input
        ref="fileInput"
        type="file"
        accept="image/*, text/*, application/pdf, application/json"
        class="hidden"
        @change="processFileInput"
      />
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
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  min-height: 104px;
  max-height: 284px;
}

.input-container {
  flex-grow: 1;
  margin-bottom: 12px;
}

.input {
  width: 100%;
  min-height: 32px;
  max-height: 128px;
  padding: 0;
  border: 1px solid var(--color-border-default);
  border-radius: 0;
  font-size: 20px;
  background: none;

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
