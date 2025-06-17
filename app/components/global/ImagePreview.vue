<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue'

const props = defineProps<{
  src: string
}>()

const isOpen = ref(false)

const openDialog = () => {
  isOpen.value = true
}

const closeDialog = () => {
  isOpen.value = false
}

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) closeDialog()
}
</script>

<template>
  <div @click="openDialog">
    <slot />
  </div>

  <Teleport to="body">
    <Transition name="modal-overlay">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-[#000000ab] flex items-center justify-center"
        @click="handleOverlayClick"
      >
        <Transition name="modal-close">
          <button
            v-if="isOpen"
            type="button"
            class="fixed top-4 right-4 z-60 w-8 h-8 flex items-center justify-center text-white"
            @click="closeDialog"
          >
            <PhX size="16" weigth="bold" />
          </button>
        </Transition>

        <Transition name="modal-image">
          <div v-if="isOpen">
            <img
              :src="props.src"
              alt="Image Preview"
              class="max-w-[80vw] max-h-[80vh] object-contain rounded-xl"
              @click.stop
            >
            <a :href="props.src" target="_blank" rel="noopener noreferrer" class="w-fit mt-2 text-white visited:text-white hover:opacity-60 transition-opacity">
              Open in new tab
            </a>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

.modal-image-enter-active,
.modal-image-leave-active {
  transition: all 0.3s ease;
}

.modal-image-enter-from,
.modal-image-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-close-enter-active,
.modal-close-leave-active {
  transition: all 0.2s ease;
}

.modal-close-enter-from,
.modal-close-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
