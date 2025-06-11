<template>
  <div class="container">
    <Text v-if="title" as="h5">{{ title }}</Text>
    <Text v-if="text" as="span">{{ text }}</Text>
    <div class="close-button">
      <PhX size="16" weight="bold" @click="console.log" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Text from './Text.vue'
import { PhX } from '@phosphor-icons/vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 350px;
  padding: 16px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 30px;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}
</style>
