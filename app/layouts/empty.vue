<template>
  <div class="layout layout--empty">
    <Background />
    <div class="wrapper">
      <slot />
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
  flex-grow: 1;
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">
</script>
