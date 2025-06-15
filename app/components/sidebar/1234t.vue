<script setup lang="ts">
import { PhTrash } from '@phosphor-icons/vue'
import { useChatsStore } from '@app/store/chats.store'

const store = useChatsStore()

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
</script>

<template>
  <div>
    <router-link :to="'/chat/' + props.id" class="chat-button">
      <slot />
    </router-link>
    <div class="">

    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.chat-button {
  @apply row__button;
  @apply row__button--inner;
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
</style>
