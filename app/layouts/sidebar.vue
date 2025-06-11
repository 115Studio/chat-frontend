<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper">
      <div v-if="showSidebar" class="container">
        <div class="container__group">
          <Text as="h1" variant="headingLg" alignment="center" class="container__group-item">115 Chat</Text>
          <button
            class="row__button row__button--inner container__group-item"
            type="button"
          >
            <template v-if="true">
              <Text as="span">
                New Chat
              </Text>
            </template>
            <template v-else>
              <PhSpinner :size="20" weight="bold" class="animate-spin" />
            </template>
          </button>
          <div class="row__divider--horizontal"></div>
          <Text as="p" variant="bodyLg">
            You are logged in. Your name is <Text as="span" tone="accent" weight="bold">{{ authStore.name }}</Text>.
          </Text>
        </div>
        <div class="container__group">
          <slot name="chats" />
        </div>
        <div class="bottom-content">
          <Text as="p" variant="bodyLg">
            Your name is <Text as="span" tone="accent" weight="bold">{{ authStore.name }}</Text>.
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
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

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
</style>

<script setup lang="ts">
import { PhSpinner } from '@phosphor-icons/vue'
import { useAuthStore } from '@app/store/auth.store'
import Header from '@app/components/global/Header.vue'

const authStore = useAuthStore()

const showSidebar = ref(true)
</script>
