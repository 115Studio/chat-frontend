<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFilesStore } from '@app/store/files.store'
import { normalizeAbsoluteLeaves } from '@app/lib/utils'

const store = useFilesStore()

const fileInput = ref<HTMLInputElement | null>(null)

const imagesToShow = computed(() => {
  return store.files
    .filter(file => file.type.startsWith('image/'))
    .map(file => ({
      url: URL.createObjectURL(file.data),
      id: file.id,
      name: file.name,
    }))
})

const processFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  for (const file of Array.from(input.files)) {
    store.addFile({
      id: Date.now() + Math.random().toString(36).substring(2, 15),
      name: file.name,
      size: file.size,
      type: file.type,
      data: file
    })
  }

  input.value = ''
}
</script>

<template>
  <div class="chat-input-container">
    <div class="input-container">
      <textarea class="input" type="text" placeholder="Ask anything" />
      <input
        ref="fileInput"
        type="file"
        accept="image/*, text/*, application/pdf, application/json"
        class="hidden"
        @change="processFileInput"
      >
    </div>
    <div class="relative">
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
          class="max-h-24 rounded-lg"
        />
      </transition-group>
    </div>
    <div class="chat-input-actions">
      <div class="chat-input-actions__left">
        <button class="voice-button">Voice</button>
        <button class="clear-button">Clear</button>
        <button class="settings-button">Settings</button>
      </div>
      <div class="chat-input-actions__right">
        <button @click="toast('This is a toast message!')">
          Toast!
        </button>
        <button class="send-button">Send</button>
        <button
          class="attach-button"
          @click="$refs.fileInput.click()">
          Attach
        </button>
        <button class="emoji-button">♥️</button>
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
  min-height: 104px; /* Adjust height as needed */
}

.input-container {
  flex-grow: 1;
  margin-bottom: 12px;
}

.input {
  width: 100%;
  min-height: 32px;
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
}

.fade-insert-move,
.fade-insert-enter-active,
.fade-insert-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
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
