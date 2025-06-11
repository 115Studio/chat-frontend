<template>
  <div
    :class="notificationClasses"
    class="vs-notification"
    :style="notificationStyles"
  >
    <!-- Icon -->
    <div v-if="icon" class="vs-notification__icon" v-html="icon"></div>
    
    <!-- Content -->
    <div class="vs-notification__content">
      <h4 v-if="title" class="vs-notification__title">{{ title }}</h4>
      <p v-if="text" class="vs-notification__text">{{ text }}</p>
      <div v-if="$slots.default" class="vs-notification__slot">
        <slot></slot>
      </div>
    </div>
    
    <!-- Close button -->
    <button
      v-if="closable"
      class="vs-notification__close"
      @click="close"
    >
      ×
    </button>
    
    <!-- Progress bar -->
    <div
      v-if="progress !== null"
      class="vs-notification__progress"
      :style="{ width: `${progressValue}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  text?: string
  icon?: string
  color?: string
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
  duration?: number | 'none'
  progress?: number | 'auto' | null
  square?: boolean
  border?: boolean
  flat?: boolean
  width?: string
  closable?: boolean
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  duration: 4000,
  progress: null,
  square: false,
  border: false,
  flat: false,
  closable: true,
  visible: false
})

const emit = defineEmits<{
  close: []
  'update:visible': [value: boolean]
}>()

const progressValue = ref(0)
let progressInterval: NodeJS.Timeout | null = null
let hideTimeout: NodeJS.Timeout | null = null

const notificationClasses = computed(() => [
  `vs-notification--${props.color || 'default'}`,
  {
    'vs-notification--square': props.square,
    'vs-notification--border': props.border,
    'vs-notification--flat': props.flat,
    'vs-notification--with-icon': props.icon,
    'vs-notification--with-progress': props.progress !== null
  }
])

const notificationStyles = computed(() => ({
  width: props.width || 'auto'
}))

const close = () => {
  emit('update:visible', false)
  emit('close')
  clearTimers()
}

const clearTimers = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const startProgress = () => {
  if (props.progress === 'auto' && typeof props.duration === 'number') {
    progressValue.value = 0
    const interval = 50
    const increment = (100 * interval) / props.duration
    
    progressInterval = setInterval(() => {
      progressValue.value += increment
      if (progressValue.value >= 100) {
        clearInterval(progressInterval!)
        progressInterval = null
      }
    }, interval)
  } else if (typeof props.progress === 'number') {
    progressValue.value = props.progress
  }
}

const startHideTimer = () => {
  if (typeof props.duration === 'number') {
    hideTimeout = setTimeout(() => {
      close()
    }, props.duration)
  }
}

const onEnter = () => {
  startProgress()
  startHideTimer()
}

const onLeave = () => {
  clearTimers()
}

// Public methods for external control
defineExpose({
  close,
  changeProgress: (value: number) => {
    progressValue.value = Math.max(0, Math.min(100, value))
  }
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style lang="scss" scoped>
// Variables
$notification-width: 330px;
$notification-max-width: 95vw;
$notification-padding: 20px;
$notification-border-radius: 12px;
$notification-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$notification-z-index: 99999;

// Colors
$colors: (
  'default': #ffffff,
  'primary': #7367f0,
  'success': #28c76f,
  'danger': #ea5455,
  'warning': #ff9f43,
  'dark': #1e1e1e
);



// Main notification
.vs-notification {
  position: relative;
  width: $notification-width;
  max-width: $notification-max-width;
  padding: $notification-padding;
  background: white;
  border-radius: $notification-border-radius;
  box-shadow: $notification-shadow;
  border: 1px solid rgba(0, 0, 0, 0.05);
  pointer-events: auto;
  overflow: hidden;
  
  // Colors
  @each $name, $color in $colors {
    &--#{$name} {
      @if $name == 'default' {
        background: $color;
        color: #333;
      } @else {
        background: $color;
        color: white;
        border-color: darken($color, 10%);
      }
    }
  }
  
  // Modifiers
  &--square {
    border-radius: 0;
  }
  
  &--border {
    border-width: 2px;
  }
  
  &--flat {
    box-shadow: none;
    border: 1px solid #e0e0e0;
  }
  
  &--with-icon {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }
  
  &--with-progress {
    padding-bottom: calc(#{$notification-padding} + 4px);
  }
}

// Icon
.vs-notification__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 2px;
}

// Content
.vs-notification__content {
  flex: 1;
  min-width: 0;
}

.vs-notification__title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.vs-notification__text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
}

.vs-notification__slot {
  margin-top: 8px;
}

// Close button
.vs-notification__close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 4px;
  
  &:hover {
    opacity: 1;
  }
}

// Progress bar
.vs-notification__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  transition: width 0.1s ease;
  border-radius: 0 0 $notification-border-radius $notification-border-radius;
  
  .vs-notification--square & {
    border-radius: 0;
  }
}


</style>
