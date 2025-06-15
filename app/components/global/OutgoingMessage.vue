<script setup lang="ts">

</script>

<template>
<div class="outgoin-message-container">
  <div class="message">
    <div class="message__content">
      <slot />
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.outgoin-message-container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  margin: 12px;
}
</style>
