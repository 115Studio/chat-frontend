<script setup lang="ts">
import { PhCheck } from '@phosphor-icons/vue'

const props = defineProps<{
  value: string
}>()

const copied = ref(false)

const copiedTimeout = ref<NodeJS.Timeout | null>(null)

const copyCode = async (content: string) => {
  try {
    if (copiedTimeout.value) clearTimeout(copiedTimeout.value)

    await navigator.clipboard.writeText(content)
    copied.value = true

    copiedTimeout.value = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<template>
  <button
    :class="{ 'copied': copied }"
    type="button"
    @click="copyCode(props.value)"
  >
    <transition
      name="fade"
      mode="out-in">
      <div v-if="!copied" class="hover:bg-neutral-200 transition-all rounded-lg p-1.5 active:scale-90 flex items-center justify-center">
        <Copy class="w-4 h-4" />
      </div>
      <div v-else class="transition-all rounded-lg p-1.5 active: flex items-center justify-center">
        <PhCheck size="16" weight="bold" />
      </div>
    </transition>
  </button>
</template>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
