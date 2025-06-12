<template>
  <div v-if="isDragging" class="file-drop-overlay">
    Drop files here 🌟
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'filesDropped', files: File[]): void
}>()

let dragCounter = 0
const isDragging = ref(false)

function onDragEnter(e: DragEvent) {
  e.preventDefault()
  dragCounter++
  if (dragCounter === 1) {
    isDragging.value = true
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  dragCounter--
  if (dragCounter === 0) {
    isDragging.value = false
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragCounter = 0
  isDragging.value = false
  const dt = e.dataTransfer
  if (!dt || !dt.files) return
  const files = Array.from(dt.files)
  emit('filesDropped', files)
}

onMounted(() => {
  window.addEventListener('dragenter', onDragEnter)
  window.addEventListener('dragover', onDragOver)
  window.addEventListener('dragleave', onDragLeave)
  window.addEventListener('drop', onDrop)
})

onUnmounted(() => {
  window.removeEventListener('dragenter', onDragEnter)
  window.removeEventListener('dragover', onDragOver)
  window.removeEventListener('dragleave', onDragLeave)
  window.removeEventListener('drop', onDrop)
})
</script>

<style scoped>
.file-drop-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2rem;
  z-index: 9999;
  pointer-events: none;
}
</style>
