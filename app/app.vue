<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
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
        <Toaster
          position="top-center"
          :expand="false"
          theme="light"
          :duration="5000"
          :toast-options="{
            style: {
              background: 'var(--color-default)',
              color: 'var(--color-text-default)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '8px',
            }
          }"
        />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss">
.transition-page-enter-active,
.transition-page-leave-active {
  transition: 0.25s;
  transform-origin: center 96px;
}
.transition-page-leave-active {
  position: relative;
}
.transition-page-enter-from {
  opacity: 0;
  transform: scale(0.99);
}
.transition-page-leave-to {
  opacity: 0;
}
</style>
