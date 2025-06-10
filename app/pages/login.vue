<script setup lang="ts">

import { useAuthStore } from '@app/store/auth.store'
import Discord from '@app/components/icons/Discord.vue'
import { useAuthWindow } from '@app/composables/use-auth-window'
import { PhSpinner, PhSpinnerGap } from '@phosphor-icons/vue'
import { useOauthUrl } from '@app/composables/use-oauth-url'
import code from '@app/middleware/code'
import { discordAuthorize } from '@app/composables/api'
import { UserPlan } from '@app/constants/user-plan'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const config = useRuntimeConfig()

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    router.push('/')
  }
}, { immediate: true })

const login = async () => {
  const redirect = useOauthUrl()

  const oauthUrlRaw = config.public.discordOauth2Url

  const oauthUrl = oauthUrlRaw
    .replace('$REDIRECT', redirect)
    .replace('$CLIENT_ID', config.public.discordClientId)

  const { getCode } = useAuthWindow(oauthUrl)

  isLoading.value = true
  const code = await getCode()

  if (!code || code === 'null') {
    isLoading.value = false
    return
  }

  const response = await discordAuthorize(code, redirect)

  if (!response.ok) {
    isLoading.value = false
    return
  }

  const data = response.result

  authStore.jwt = data.jwt
  authStore.email = data.email
  authStore.name = data.name
  authStore.id = data.id
  authStore.plan = data.plan

  authStore.isAuthenticated = true
  isLoading.value = false

  await router.push('/')
}

definePageMeta({
  middleware: [ code ]
})

setPageLayout('default')
</script>

<template>
  <div class="row">
    <div class="row__info">
      <Text as="h1" variant="headingXl">Hello, username!</Text>
    </div>
    <div class="row__divider" />
    <div class="row__end row__end--between">
      <div class="row__group">
        <Text as="p" variant="headingSm" alignment="center" weight="medium">
          Welcome to <Text as="span" tone="accent" weight="bold">115 chat</Text>.
        </Text>
      </div>
      <div class="row__group">
        <button
          :disabled="isLoading"
          class="row__button row__button--accent"
          type="button"
          @click="login()"
        >
          <template v-if="!isLoading">
            <Discord />
            <Text as="span">
              Continue with Discord
            </Text>
          </template>
          <template v-else>
            <PhSpinner :size="20" weight="bold" class="animate-spin" />
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
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
