<script setup lang="ts">
import type { ListItemProps } from '@app/types'

const props = defineProps<ListItemProps>()
</script>

<template>
  <button type="button" class="list-item" @click="props.action">
    <Component :is="props.icon" class="list-item__icon" />
    <Text as="p" class="list-item__label">
      {{ props.label }}
    </Text>
  </button>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  height: 48px;
  background-color: var(--color-btn-inner-bg);
  border: 1px solid var(--color-btn-inner-border);
  color: var(--color-btn-inner-text);
  box-sizing: border-box;
  width: 100%;
  border-radius: 12px;
  padding: 0 12px;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--color-btn-inner-hover-bg);
    border: 1px solid var(--color-btn-inner-hover-border);
  }

  &:active,
  &:focus-visible {
    background-color: var(--color-btn-inner-selected-bg);
    border: 1px solid var(--color-btn-inner-selected-border);
  }
}
</style>
