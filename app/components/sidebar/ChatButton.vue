<script setup lang="ts">
import { PhDotsThree, PhPencilSimple, PhPushPin, PhPushPinSlash, PhTrash } from '@phosphor-icons/vue'
import { useChatsStore } from '@app/store/chats.store'
import { pinChannel, renameChannel } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useSidebarStore } from '@app/store/sidebar.store'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smallerOrEqual('md')

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
  if (isMobile.value) useSidebarStore().close()
  await store.deleteChat(props.id)

  if (chatIsActive.value) await useRouter().push('/')
}

const pinChat = async () => {
  if (isMobile.value) useSidebarStore().close()
  const chatPinned = store.getChat(props.id)?.isPinned ?? false

  store.pinChatLocal(props.id, !chatPinned)

  await pinChannel(useAuthStore().jwt, props.id, !chatPinned)
}

const move = () => {
  console.log(breakpoints.smallerOrEqual('md'), isMobile.value)
  if (isMobile.value) useSidebarStore().close()
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
  if (editingName.value === store.getChat(props.id)?.name) {
    isEditing.value = false
    return
  }

  store.renameChatLocal(props.id, editingName.value.trim())
  isEditing.value = false

  if (editingName.value.trim())
    await renameChannel(useAuthStore().jwt, props.id, editingName.value.trim())
}

const cancelEdit = () => {
  isEditing.value = false
  editingName.value = ''
}
</script>

<template>
  <button type="button" class="chat-button" :class="{ 'chat-button--active': chatIsActive }">
    <div class="flex-1 min-w-0 p-2 pl-3" @click="!isEditing && move()" @dblclick="startEditing">
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
      >
      <div v-else class="channel-name">
        <slot />
      </div>
    </div>
    <div class="flex flex-row justify-end gap-1 controls shrink-0">
      <DropdownMenu v-model="dropdownOpen" @update:open="dropdownOpen = $event">
        <DropdownMenuTrigger>
          <div
            class="dots-button bg-white p-1 rounded-md flex items-center justify-center mr-1"
            :class="{ 'dots-button--open': dropdownOpen }"
          >
            <PhDotsThree size="18" weight="bold" class="text-slate-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="startEditing">
            <PhPencilSimple size="12" weight="bold" />
            <Text as="span">Rename</Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
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
  @apply border border-transparent transition-colors duration-200 text-left flex flex-row w-full items-center justify-between text-ellipsis line-clamp-1;
  color: var(--color-btn-inner-text);
  border-radius: 12px;

  &:hover {
    background-color: var(--color-btn-inner-selected-bg);
    // border: 1px solid var(--color-btn-inner-hover-border);
  }

  &:active,
  &:focus-visible,
  &--active {
    background-color: var(--color-btn-inner-selected-bg);
    // border: 1px solid var(--color-btn-inner-selected-border);
  }
}

.controls {
  transform: translateX(100%);
  opacity: 0;
  width: 0;
  transition: opacity 0.2s ease, width 0.2s ease, transform 0.2s ease;
}

.chat-button:hover .controls,
.chat-button:has([data-state="open"]) .controls {
  opacity: 1;
  width: min-content;
  transform: translateX(0);
}

.dots-button {
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background: var(--color-btn-inner-selected-bg);
  }
}

@media (pointer: coarse) {
  .controls {
    opacity: 1;
    width: min-content;
    transform: translateX(0);
  }

  .channel-name {
    @apply truncate;
  }
}

.channel-name {
  @apply w-full;
}

.chat-button:hover .channel-name,
.chat-button:has(.dots-button--open) .channel-name {
  @apply truncate;
}

.channel-name-input {
  @apply text-inherit;

  &:focus {
    @apply ring-0;
  }
}
</style>
