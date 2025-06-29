<template>
  <div
    v-if="isDragging"
    :class="['file-drop-overlay', { forbidden: isVideoDragged || isUnsupportedDragged }]"
  >
    <span v-if="isVideoDragged">Video uploads are not allowed 🚫</span>
    <span v-else-if="isUnsupportedDragged">This file type is not supported 🚫</span>
    <span v-else>Drop files here 🌟</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { allowedTypes } from '@app/constants/allowed-file-types'
const emit = defineEmits<{ (e: 'filesDropped', files: File[]): void }>()

let dragCounter = 0
let listenersAttached = false

const isDragging = ref(false)
const isVideoDragged = ref(false)
const isUnsupportedDragged = ref(false)

function hasFiles(dt: DataTransfer | null): boolean {
  if (!dt?.items) return false

  for (const item of dt.items) {
    if (item.kind === 'file') return true
  }
  return false
}

function hasVideo(dt: DataTransfer | null): boolean {
  if (!dt?.items) return false

  for (const item of dt.items)
    if (item.kind === 'file' && item.type.startsWith('video/')) return true

  return false
}

function hasUnsupported(dt: DataTransfer | null): boolean {
  if (!dt?.items) return false

  for (const item of dt.items) {
    if (item.kind === 'file' && !allowedTypes.includes(item.type)) {
      return true
    }
  }
  return false
}

function onDragEnter(e: DragEvent) {
  e.preventDefault()

  const dt = e.dataTransfer

  if (!hasFiles(dt)) return

  dragCounter++

  if (dragCounter === 1) {
    isDragging.value = true

    if (hasVideo(dt)) isVideoDragged.value = true
    else if (hasUnsupported(dt)) isUnsupportedDragged.value = true
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()

  const dt = e.dataTransfer

  if (!hasFiles(dt)) return

  if (isVideoDragged.value || isUnsupportedDragged.value) e.dataTransfer!.dropEffect = 'none'
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()

  const dt = e.dataTransfer

  if (!hasFiles(dt)) return

  dragCounter--

  if (dragCounter === 0) {
    isDragging.value = false
    isVideoDragged.value = false
    isUnsupportedDragged.value = false
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()

  const dt = e.dataTransfer

  if (!hasFiles(dt)) return

  dragCounter = 0

  if (isVideoDragged.value || isUnsupportedDragged.value) {
    isDragging.value = false
    isVideoDragged.value = false
    isUnsupportedDragged.value = false
    return
  }

  isDragging.value = false
  if (!dt?.files) return

  console.log('Files dropped:', dt.files)

  const files = Array.from(dt.files).filter((file) =>
    allowedTypes.includes(file.type)
  )

  emit('filesDropped', files)
}

function attachListeners() {
  if (listenersAttached) return

  window.addEventListener('dragenter', onDragEnter)
  window.addEventListener('dragover', onDragOver)
  window.addEventListener('dragleave', onDragLeave)
  window.addEventListener('drop', onDrop)

  listenersAttached = true
}

function removeListeners() {
  if (!listenersAttached) return

  window.removeEventListener('dragenter', onDragEnter)
  window.removeEventListener('dragover', onDragOver)
  window.removeEventListener('dragleave', onDragLeave)
  window.removeEventListener('drop', onDrop)

  listenersAttached = false

  dragCounter = 0
  isDragging.value = false
  isVideoDragged.value = false
  isUnsupportedDragged.value = false
}

onMounted(() => {
  attachListeners()
})

onBeforeUnmount(() => {
  removeListeners()
})

onUnmounted(() => {
  removeListeners()
})
</script>

<style scoped>
.file-drop-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2rem;
  z-index: 9999;
  pointer-events: auto;
}

.file-drop-overlay.forbidden {
  cursor: not-allowed;
}
</style>
