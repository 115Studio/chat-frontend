<script setup lang="ts">
// pass class and emits props to the button component
import { computed, defineProps } from 'vue'

const props = defineProps<{
  class?: string
}>()

const buttonClasses = computed(() => {
  return {
    'row__button': true,
    'row__button--inner': true,
    [props.class || '']: !!props.class,
  }
})
</script>

<template>
  <button type="button" :class="buttonClasses">
    <slot />
  </button>
</template>

<style scoped lang="scss"></style>
