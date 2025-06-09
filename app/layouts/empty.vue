<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
