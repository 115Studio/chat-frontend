<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@app/types/components/button-props.type'

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'inner',
    size: 'md',
    type: 'button',
    alignment: 'center',
    weight: 'bold',
    disabled: false,
    loading: false,
    skeleton: false,
    fullWidth: false,
    class: '',
  },
)

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emits('click', event)
  }
}

const buttonClasses = computed(() => {
  return {
    'row__button': true,
    [`row__button--${props.variant}`]: !!props.variant,
    [`row__button--size-${props.size}`]: props.size !== 'md',
    [`row__button--alignment-${props.alignment}`]: props.alignment !== 'center',
    [`row__button--weight-${props.weight}`]: props.weight !== 'bold',
    'row__button--full-width': props.fullWidth,
    'row__button--loading': props.loading,
    'skeleton': props.skeleton,
    [props.class || '']: !!props.class,
  }
})

const isDisabled = computed(() => props.disabled || props.loading || props.skeleton)
</script>

<template>
  <button
    :type="props.type"
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';
</style>
