<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper max-h-screen">
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
        <div class="container__group flex flex-col gap-2 relative">
          <template v-if="chatsStore.getPinnedChats().length > 0">
            <Text as="span" variant="bodyMd"> Pinned Chats </Text>
            <TransitionGroup name="fade-insert-right">
              <ChatButton v-for="chat in chatsStore.getPinnedChats()" :id="chat.id" :key="chat.id">
                <Text v-if="chat.name !== MagicNumber.NameShowSkeleton" :truncate="true" as="span">
                  {{ chat.name }}
                </Text>
                <div v-else class="name-skeleton" />
              </ChatButton>
            </TransitionGroup>
            <hr />
          </template>
          <TransitionGroup name="fade-insert-right">
            <ChatButton v-for="chat in chatsStore.getUnpinnedChats()" :id="chat.id" :key="chat.id">
              <Text v-if="chat.name !== MagicNumber.NameShowSkeleton" :truncate="true" as="span">
                {{ chat.name }}
              </Text>
              <div v-else class="name-skeleton" />
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
      <div class="content max-h-screen">
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
import { getChannels } from '@app/composables/api'

const authStore = useAuthStore()

const showSidebar = ref(true)

const chatId = useRoute().params.id as string | undefined

const store = useFilesStore(chatId ?? '@new')()
const chatsStore = useChatsStore()

const processFileDrop = async (files: File[]) => {
  console.log('Files dropped func:', files)
  for (const file of files) {
    await store.addFile(file)
  }
}

const createNewChat = () => {
  useRouter().push('/')
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
