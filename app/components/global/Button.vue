<script setup lang="ts">
// pass class and emits props to the button component
import { computed, defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    class: '',
    type: 'button',
  },
)

const buttonClasses = computed(() => {
  return {
    'row__button': true,
    'row__button--inner': true,
    [props.class || '']: !!props.class,
  }
})
</script>

<template>
  <button :type="props.type" :class="buttonClasses">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';
</style>
