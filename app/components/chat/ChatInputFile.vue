<script setup lang="ts">
import { PhCircleNotch, PhX, PhFile } from '@phosphor-icons/vue'
import { useFilesStore } from '@app/store/files.store'

const props = defineProps<{
  id: string
  name: string
}>()

const store = useFilesStore('@new')()
</script>

<template>
  <div class="relative">
    <div class="h-24 w-24 rounded-lg bg-stone-100 p-4 flex flex-col items-center justify-center text-center">
      <PhFile
        class="w-full h-full object-cover rounded-custom text-stone-700"
        weight="fill"
      />
      <Text as="p" variant="bodySm" class="text-center w-full truncate">
        {{ props.name }}
      </Text>
    </div>
    <transition name="fade">
      <button
        v-if="!store.isUploading(props.id)"
        class="bg-default absolute top-0 right-0 rounded-bl-lg p-1"
        @click="store.removeFile(props.id)"
      >
        <PhX size="20" weight="bold" />
      </button>
    </transition>
    <transition name="fade">
      <div
        v-if="store.isUploading(props.id)"
        class="absolute inset-0 bg-stone-950/50 flex items-center justify-center rounded-lg z-10"
      >
        <PhCircleNotch
          class="animate-spin text-white"
          size="24"
          weight="bold"
        />
      </div>
    </transition>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
