<script setup lang="ts">

import { useAuthStore } from '@app/store/auth.store'
import Discord from '@app/components/icons/Discord.vue'
import { PhPlus, PhSpinner } from '@phosphor-icons/vue'

const router = useRouter()
const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

setPageLayout('sidebar')
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <Text as="h1" variant="headingXl">Xd</Text>
      <Chat />
    </div>
    <div class="bottom-content">
      <ChatInput />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.page-content {
  flex: 1;
}

.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 292px;
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  min-height: 400px; /* Adjust height as needed */
}

.container__group-item {
  margin-bottom: 18px;
}

.bottom-content {
  margin-top: auto;
}

.top-content {
  margin-bottom: auto;
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
