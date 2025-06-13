<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'
import { useChatStore } from '@app/store/chat.store'

const store = useChatStore()

const props = defineProps<{
  id: string
}>()

const chatIsActive = computed(() => {
  return useRoute().params?.id === props.id
})

const deleteChat = async () => {
  store.deleteChat(props.id)

  if (chatIsActive.value) await useRouter().push('/')
}

const move = () => {
  useRouter().push(`/chat/${props.id}`)
}
</script>

<template>
  <button
    type="button"
    class="chat-button"
    :class="{ 'chat-button--active': chatIsActive }"
    @click="move"
  >
    <slot />
    <div class="flex flex-row justify-end overflow-hidden">
      <div
        class="trash-button bg-red-100 p-1 rounded-md flex items-center justify-center z-1000"
        @click.stop="deleteChat"
      >
        <PhTrash size="18" weight="bold" class="text-red-500" />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.chat-button {
  @apply px-1.5 py-1.5 border border-transparent rounded-lg transition-colors duration-200 text-left flex flex-row w-full items-center justify-between;
  color: var(--color-btn-inner-text);

  &:hover {
    background-color: var(--color-btn-inner-hover-bg);
    border: 1px solid var(--color-btn-inner-hover-border);
  }

  &--active {
    background-color: var(--color-btn-inner-hover-bg);
    border: 1px solid var(--color-btn-inner-hover-border);
  }
}

.trash-button {
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    @apply bg-red-200 text-red-600;
  }
}

.chat-button:hover .trash-button {
  transform: translateX(0);
  opacity: 1;

  @apply cursor-pointer;
}
</style>
