<script setup lang="ts">

import { useAuthStore } from '@app/store/auth.store'
import Discord from '@app/components/icons/Discord.vue'

const router = useRouter()
const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

setPageLayout('empty')
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="row">
    <div class="row__info">
      <Text as="h1" variant="headingXl">Welcome back!</Text>
    </div>
    <div class="row__divider" />
    <Text as="p" variant="bodyLg">
      You are logged in. Your name is <Text as="span" tone="accent" weight="bold">{{ authStore.name }}</Text>.
    </Text>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

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
