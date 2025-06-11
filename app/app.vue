<script setup lang="ts">
import NotificationContainer from '@app/components/global/NotificationContainer.vue'
</script>

<template>
  <Html lang="ru" dir="ltr">
    <Head>
      <Title>115 Chat</Title>
      <Meta property="og:title" content="115 Chat" />
      <Meta name="theme-color" content="#16191E" />
      <Meta property="og:site_name" content="115 Chat" />
      <Meta property="og:type" content="website" />
      <Link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <NotificationContainer />
    </Body>
  </Html>
</template>

<style lang="scss">
.transition-page {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.15s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
