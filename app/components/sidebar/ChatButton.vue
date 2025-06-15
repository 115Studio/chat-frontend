<script setup lang="ts">
import { PhDotsThree, PhPushPin, PhPushPinSlash, PhTrash } from '@phosphor-icons/vue'
import { useChatsStore } from '@app/store/chats.store'
import { pinChannel, renameChannel } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'

const store = useChatsStore()

const props = defineProps<{
  id: string
}>()

const chatIsActive = computed(() => {
  return useRoute().params?.id === props.id
})

const chatPinned = computed(() => {
  const chat = store.getChat(props.id)
  return chat ? chat.isPinned : false
})

const chatName = computed(() => {
  const chat = store.getChat(props.id)
  return chat ? chat.name : ''
})

const deleteChat = async () => {
  store.deleteChat(props.id)

  if (chatIsActive.value) await useRouter().push('/')
}

const pinChat = async () => {
  await pinChannel(useAuthStore().jwt, props.id, !chatPinned.value)
}

const move = () => {
  useRouter().push(`/chat/${props.id}`)
}

const dropdownOpen = ref(false)
const isEditing = ref(false)
const editingName = ref('')
const inputRef = ref<HTMLInputElement>()

const startEditing = () => {
  isEditing.value = true
  editingName.value = chatName.value

  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

const saveEdit = async () => {
  if (editingName.value.trim() && editingName.value !== chatName.value)
    await renameChannel(useAuthStore().jwt, props.id, editingName.value.trim())

  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editingName.value = ''
}
</script>

<template>
  <button type="button" class="chat-button" :class="{ 'chat-button--active': chatIsActive }">
    <div class="w-full px-2 py-2.5" @click="!isEditing && move()" @dblclick="startEditing">
      <input
        v-if="isEditing"
        ref="inputRef"
        v-model="editingName"
        type="text"
        class="channel-name-input w-full bg-transparent border-none outline-none text-inherit font-inherit"
        @blur="saveEdit()"
        @keydown.exact.enter="saveEdit()"
        @keydown.exact.esc="cancelEdit"
        @click.stop
      />
      <div v-else class="channel-name">
        <slot />
      </div>
    </div>
    <div
      class="flex flex-row justify-end gap-1 min-w-content ml-2 overflow-hidden controls min-w-7"
    >
      <DropdownMenu :open="dropdownOpen" @update:open="dropdownOpen = $event">
        <DropdownMenuTrigger>
          <div
            class="dots-button bg-slate-100 p-1 rounded-md flex items-center justify-center z-[1000]"
            :class="{ 'dots-button--open': dropdownOpen }"
          >
            <PhDotsThree size="18" weight="bold" class="text-slate-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="pinChat">
            <template v-if="!chatPinned">
              <PhPushPin size="12" weight="bold" />
              <Text as="span">Pin</Text>
            </template>
            <template v-else>
              <PhPushPinSlash size="12" weight="bold" />
              <Text as="span">Unpin</Text>
            </template>
          </DropdownMenuItem>
          <DropdownMenuItem
            class="text-red-500 focus:bg-red-100 focus:text-red-600"
            @click="deleteChat"
          >
            <PhTrash size="12" weight="bold" />
            <Text as="span">Delete</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </button>
</template>

<style scoped lang="scss">
.chat-button {
  @apply border border-transparent rounded-lg transition-colors duration-200 text-left flex flex-row w-full items-center justify-between text-ellipsis line-clamp-1;
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

.controls {
  background-color: var(--color-btn-inner-hover-bg);
}

.dots-button {
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    @apply bg-slate-200 text-slate-600;
  }

  &--open {
    transform: translateX(0);
    opacity: 1;
  }
}

.chat-button:hover .dots-button {
  transform: translateX(0);
  opacity: 1;

  @apply cursor-pointer;
}

@media (pointer: coarse) {
  .dots-button {
    transform: translateX(0);
    opacity: 1;
  }
}

.channel-name {
  @apply w-full;
}

.channel-name-input {
  @apply text-inherit;

  &:focus {
    @apply ring-0;
  }
}
</style>
