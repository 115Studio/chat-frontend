<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper max-h-screen">
      <div class="container relative" :class="{ 'container--closed': !sidebar.isOpen }">
        <div v-if="sidebar.isOpen" class="container__content">
          <div class="container__group">
            <Text as="h1" variant="headingMd" alignment="center" class="container__group-item">
              115 Chat
            </Text>
            <div class="flex flex-row gap-2">
              <Button class="container__group-item ml-[-0.5rem]" full-width @click="createNewChat">
                <template v-if="true">
                  <Text as="span"> New Chat </Text>
                </template>
                <template v-else>
                  <PhSpinner :size="20" weight="bold" class="animate-spin" />
                </template>
              </Button>

              <Button class="container__group-item ml-[-0.5rem] hidden-on-pc" @click="sidebar.toggle()">
                <PhX size="20" weight="bold" />
              </Button>
            </div>
            <div class="row__divider--horizontal" />
          </div>
          <div class="container__group container__group--scrollable">
            <div class="chats-wrapper">
                <template v-if="chatsStore.getPinnedChats().length > 0">
                  <div class="flex flex-row items-center ml-2 mb-2">
                    <PhPushPin size="16" weight="bold" />
                    <Text as="span" variant="bodyMd" class="ml-1.5">Pinned Chats</Text>
                  </div>
                  <transition-group
                    name="fade"
                    @before-leave="normalizeAbsoluteLeaves"
                  >
                    <ChatButton
                      v-for="chat in chatsStore.getPinnedChats()"
                      :id="chat.id"
                      :key="chat.id"
                      class="mb-1"
                    >
                      <Text
                        v-if="chat.name !== MagicNumber.NameShowSkeleton"
                        :truncate="true"
                        as="span"
                        variant="bodySm"
                        tone="muted"
                      >
                        {{ chat.name }}
                      </Text>
                      <div v-else class="name-skeleton" />
                    </ChatButton>
                  </transition-group>
                  <hr class="section-divider" >
                </template>
                <transition-group
                  name="fade"
                  @before-leave="normalizeAbsoluteLeaves"
                >
                  <ChatButton
                    v-for="chat in chatsStore.getUnpinnedChats()"
                    :id="chat.id"
                    :key="chat.id"
                    class="mb-1"
                  >
                    <Text v-if="chat.name !== MagicNumber.NameShowSkeleton" :truncate="true" as="p" variant="bodySm" tone="muted">
                      {{ chat.name }}
                    </Text>
                    <div v-else class="name-skeleton" />
                  </ChatButton>
                </transition-group>
            </div>
          </div>
          <div class="bottom-content text-center">
            <Text as="p" variant="bodyLg">
              Your name is
              <Popover>
                <PopoverTrigger>
                  <Text as="span" tone="accent" weight="bold">{{ authStore.name }}</Text>
                </PopoverTrigger>
                <PopoverContent>
                  <div
                    class="text-red-500 w-full px-2 py-1 rounded-md flex flex-row gap-2 items-center active:bg-red-200 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                    @click="signOut"
                  >
                    <PhSignOut size="16" weight="bold" />
                    <Text as="span">Sign Out</Text>
                  </div>
                </PopoverContent>
              </Popover>
              .
            </Text>
          </div>
        </div>
      </div>
      <div class="content max-h-screen" :class="{ 'content--sidebar-closed': !sidebar.isOpen }">
        <div :class="{ 'overlay': sidebar.isOpen }"/>
        <div class="header" :class="{ 'hidden md:flex': sidebar.isOpen }">
          <Header />
        </div>
        <slot />
      </div>
    </div>
    <FileDrop @files-dropped="processFileDrop" />
  </div>
</template>

<script setup lang="ts">
import { PhPushPin, PhSignOut, PhSpinner, PhX } from '@phosphor-icons/vue'
import { useAuthStore } from '@app/store/auth.store'
import Header from '@app/components/global/Header.vue'
import { useFilesStore } from '@app/store/files.store'
import { useChatsStore } from '@app/store/chats.store'
import { MagicNumber } from '@app/constants/magic-number'
import { getChannels } from '@app/composables/api'
import { useSidebarStore } from '@app/store/sidebar.store'
import { normalizeAbsoluteLeaves } from '@app/lib/utils'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const authStore = useAuthStore()
const sidebar = useSidebarStore()

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smallerOrEqual('md')

const chatsStore = useChatsStore()

const processFileDrop = async (files: File[]) => {
  console.log('Files dropped func:',useRoute().params.id, files)
  for (const file of files) {
    await useFilesStore(useRoute().params.id as string ?? '@new')().addFile(file)
  }
}

const createNewChat = () => {
  if (isMobile.value) sidebar.close()
  useRouter().push('/')
}

const signOut = () => {
  authStore.signOut()
  useRouter().push('/login')
}

onMounted(async () => {
  const chats = await getChannels(useAuthStore().jwt, undefined, true)

  if (chats.ok) {
    chatsStore.syncChatsWithBackend(chats.result.channels)
  } else {
    console.error('Failed to fetch chats:', chats.errors)
  }
})
</script>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.name-skeleton {
  @include mixins.skeleton(100%, 20px, 12px);
}

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  position: fixed;
  width: calc(100% - 24px); /* Full width minus margin */
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 24px); /* Full height minus margin */
  max-height: calc(100vh - 24px);
  overflow: hidden; /* Prevent container from overflowing */
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out, margin 0.3s ease-in-out;
  z-index: 100;

  @apply md:relative md:w-[276px];

  &--closed {
    width: 0;
    padding: 0;
    margin: 12px 0;
    border: none;
  }
}

.container__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 212px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease-in-out;

  &--sidebar-closed {
    margin-left: 12px;
  }
}

.container__group-item {
  margin-bottom: 18px;
}

.container__group--scrollable {
  flex: 1 1 0; /* Allow grow, shrink, and set basis to 0 */
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 16px;
  min-height: 0; /* Allow flex item to shrink below content size */

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border-default);
    border-radius: 3px;

    &:hover {
      background: var(--color-border-hover);
    }
  }
}

.chats-wrapper {
  display: flex;
  flex-direction: column;
}

.chat-list {
  display: flex;
  flex-direction: column;
}

.section-title {
  margin-bottom: 8px;
}

.section-divider {
  margin: 12px 0;
}

.bottom-content {
  margin-top: auto;
  flex-shrink: 0;
}

.row {
  &__group {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 12px;

    &.skeleton {
      @include mixins.skeleton(128px, 16px, 4px);
    }
  }
}

/* Ensure TransitionGroup displays as flex container */
.chat-list {
  &.fade-insert-right {
    display: flex !important;
    flex-direction: column;
    gap: 8px;
  }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}
.fade-leave-active {
  max-width: 200px;
  position: absolute;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;

  @apply md:hidden;
}

.hidden-on-pc {
  @apply block md:hidden;
}

.hidden-on-mobile {
  @apply hidden md:block;
}
</style>
