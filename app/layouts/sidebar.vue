<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper">
      <div v-if="showSidebar" class="container">
        <div class="container__group">
          <Text as="h1" variant="headingLg" alignment="center" class="container__group-item">
            115 Chat
          </Text>
          <button
            class="row__button row__button--inner container__group-item ml-[-0.5rem]"
            type="button"
            @click="createNewChat"
          >
            <template v-if="true">
              <Text as="span"> New Chat </Text>
            </template>
            <template v-else>
              <PhSpinner :size="20" weight="bold" class="animate-spin" />
            </template>
          </button>
          <div class="row__divider--horizontal" />
        </div>
        <div class="container__group flex flex-col gap-0 relative">
          <TransitionGroup name="fade-insert-right">
            <ChatButton v-for="chat in chatsStore.chats" :id="chat.id" :key="chat.id">
              <Text as="span" v-if="chat.name !== MagicNumber.NameShowSkeleton">
                {{ chat.name }}
              </Text>
              <div v-else class="name-skeleton"></div>
            </ChatButton>
          </TransitionGroup>
        </div>
        <div class="bottom-content">
          <Text as="p" variant="bodyLg">
            Your name is <Text as="span" tone="accent" weight="bold">{{ authStore.name }}</Text
            >.
          </Text>
        </div>
      </div>
      <div class="content">
        <div class="header">
          <Header />
        </div>
        <slot />
      </div>
    </div>
    <FileDrop @files-dropped="processFileDrop" />
  </div>
</template>

<script setup lang="ts">
import { PhSpinner } from '@phosphor-icons/vue'
import { useAuthStore } from '@app/store/auth.store'
import Header from '@app/components/global/Header.vue'
import { useFilesStore } from '@app/store/files.store'
import { useChatsStore } from '@app/store/chats.store'
import { MagicNumber } from '@app/constants/magic-number'

const authStore = useAuthStore()

const showSidebar = ref(true)

const store = useFilesStore('@new')()
const chatsStore = useChatsStore()

const processFileDrop = async (files: File[]) => {
  for (const file of files) {
    store.addFile({
      id: Date.now() + Math.random().toString(36).substring(2, 15),
      name: file.name,
      size: file.size,
      type: file.type,
      data: file,
    })
  }
}

const createNewChat = () => {
  useRouter().push('/')
}
</script>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.name-skeleton {
  @include mixins.skeleton(100%, 24px, 12px);
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
  width: 276px;
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  min-height: 400px; /* Adjust height as needed */
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
}

.container__group-item {
  margin-bottom: 18px;
}

.bottom-content {
  margin-top: auto;
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

.fade-insert-right-move,
.fade-insert-right-enter-active,
.fade-insert-right-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}
.fade-insert-right-leave-active {
  position: absolute;
}
.fade-insert-right-enter-from,
.fade-insert-right-leave-to {
  opacity: 0;
}

.fade-insert-right-enter-to,
.fade-insert-right-leave-from {
  opacity: 1;
}
</style>
