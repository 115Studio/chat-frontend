<template>
  <div class="layout layout--default">
    <Background />
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="row__info">
            <Text as="h1" variant="heading2xl">Hello, World!</Text>
          </div>
          <div class="row__divider" />
          <div>
            <Text as="p" variant="bodyLg">
              Welcome to <Text as="span" tone="accent" weight="bold">115 chat</Text>.
              This is just some text for <Text as="span" tone="success" weight="bold">hello world.</Text>
              Good luck have fun!
            </Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  max-width: 708px;
}

.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
}
</style>
<script setup lang="ts">
</script>
