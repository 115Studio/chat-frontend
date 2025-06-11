<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@app/lib/utils'

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md'
})

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const switchValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits('update:modelValue', value)
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        switch: 'h-6 w-10',
        thumb: 'h-3 w-3',
        translate: 'translate-x-5'
      }
    case 'lg':
      return {
        switch: 'h-9 w-16',
        thumb: 'h-6 w-6',
        translate: 'translate-x-8'
      }
    default:
      return {
        switch: 'h-8 w-14',
        thumb: 'h-5 w-5',
        translate: 'translate-x-7'
      }
  }
})

// Отдельные объекты стилей для каждой части переключателя
const switchClasses = computed(() => cn(
  'switch relative inline-flex items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none outline-none overflow-hidden',
  sizeClasses.value.switch,
  props.disabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer',
  props.class
))

const backgroundClassesFirst = computed(() => cn(
  'absolute inset-0 rounded-full transition-colors duration-200 ease-in-out bg-muted'
))

const backgroundClasses = computed(() => cn(
  'absolute inset-0 rounded-full transition-new duration-150 ease-in-out bg-accent',
  switchValue.value ? 'w-full' : 'w-0'
))

const thumbClasses = computed(() => cn(
  'pointer-events-none inline-block rounded-full shadow-lg ring-0 transition-all duration-200 ease-in-out relative z-10 bg-white',
  sizeClasses.value.thumb,
  switchValue.value
    ? sizeClasses.value.translate
    : 'translate-x-1',
))

function toggle() {
  if (!props.disabled) {
    switchValue.value = !switchValue.value
  }
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="switchValue"
    :disabled="disabled"
    :class="switchClasses"
    @click="toggle"
  >
    <div :class="backgroundClassesFirst" />
    <div :class="backgroundClasses" />
    <span :class="thumbClasses" />
  </button>
</template>

<style lang="scss" scoped>
.transition-new {
  transition: all .25s ease
}

.switch {
  transition: all .25s ease;
  &:active {
    transform: scale(.9)
  }
}

.bg-accent {
  background-color: var(--color-accent);
}
</style>
