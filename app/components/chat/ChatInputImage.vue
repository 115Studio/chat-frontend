<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue'
import { useFilesStore } from '@app/store/files.store'

const props = defineProps<{
  image: string
  id: string
}>()

const store = useFilesStore()
</script>

<template>
  <div class="relative">
    <img
      :src="props.image"
      alt="Attached file"
      class="max-h-24 rounded-lg"
    >
      <button class="bg-default absolute top-0 right-0 rounded-bl-lg p-1" @click="store.removeFile(props.id)">
        <PhX size="20" weight="bold" />
      </button>
  </div>
</template>

<style scoped lang="scss">
.bg-default {
  background: var(--color-default);
}

.rounded-custom {
  @apply rounded-bl-lg;
  border-top-right-radius: 0.6rem;
}
</style>
