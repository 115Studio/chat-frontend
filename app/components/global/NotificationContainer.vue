<template>
  <Teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      :class="`vs-notification-container vs-notification-container--${position}`"
    >
      <TransitionGroup
        name="vs-notification-stack"
        tag="div"
        class="vs-notification-stack"
      >
        <div
          v-for="(notification, index) in getNotificationsByPosition(position)"
          :key="notification.id"
          :class="getStackClasses(index, getNotificationsByPosition(position).length)"
          :style="getStackStyles(index, getNotificationsByPosition(position).length)"
        >
          <Notification
            v-bind="notification"
            :visible="true"
            @close="removeNotification(notification.id)"
            @update:visible="(visible) => !visible && removeNotification(notification.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Notification from './Notification.vue'
import { useNotificationStore } from '../../stores/notification.store'

const store = useNotificationStore()

const positions = [
  'top-right', 'top-left', 'top-center', 
  'bottom-right', 'bottom-left', 'bottom-center'
] as const

const getNotificationsByPosition = (position: string) => {
  return store.notifications.filter((n: any) => n.position === position)
}

const removeNotification = (id: string) => {
  store.removeNotification(id)
}

const getStackClasses = (index: number, total: number) => {
  const isTop = index === total - 1
  const isSecond = index === total - 2
  const isThird = index === total - 3
  
  return [
    'vs-notification-stack-item',
    {
      'vs-notification-stack-item--top': isTop,
      'vs-notification-stack-item--second': isSecond,
      'vs-notification-stack-item--third': isThird,
      'vs-notification-stack-item--hidden': index < total - 3
    }
  ]
}

const getStackStyles = (index: number, total: number) => {
  const isBottom = index < total - 3
  if (isBottom) {
    return {
      transform: 'translateY(-100%)',
      opacity: 0,
      pointerEvents: 'none' as const
    }
  }
  
  const stackIndex = total - 1 - index
  const translateY = stackIndex * -8
  const scale = 1 - (stackIndex * 0.05)
  const opacity = 1 - (stackIndex * 0.15)
  
  return {
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity,
    zIndex: 1000 - stackIndex
  }
}
</script>

<style lang="scss" scoped>
// Variables
$notification-z-index: 99999;

// Container positioning
.vs-notification-container {
  position: fixed;
  z-index: $notification-z-index;
  pointer-events: none;
  
  &--top-right {
    top: 20px;
    right: 20px;
  }
  
  &--top-left {
    top: 20px;
    left: 20px;
  }
  
  &--top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &--bottom-right {
    bottom: 20px;
    right: 20px;
  }
  
  &--bottom-left {
    bottom: 20px;
    left: 20px;
  }
  
  &--bottom-center {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.vs-notification-stack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vs-notification-stack-item {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: center;
  pointer-events: auto;
  
  &--hidden {
    pointer-events: none;
  }
}

// Stack animations
.vs-notification-stack-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.vs-notification-stack-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.vs-notification-stack-enter-from {
  .vs-notification-container--top-right &,
  .vs-notification-container--bottom-right & {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .vs-notification-container--top-left &,
  .vs-notification-container--bottom-left & {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .vs-notification-container--top-center &,
  .vs-notification-container--bottom-center & {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
}

.vs-notification-stack-leave-to {
  .vs-notification-container--top-right &,
  .vs-notification-container--bottom-right & {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .vs-notification-container--top-left &,
  .vs-notification-container--bottom-left & {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .vs-notification-container--top-center &,
  .vs-notification-container--bottom-center & {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
}

// Different stacking for top and bottom positions
.vs-notification-container--top-right,
.vs-notification-container--top-left,
.vs-notification-container--top-center {
  .vs-notification-stack {
    flex-direction: column;
  }
}

.vs-notification-container--bottom-right,
.vs-notification-container--bottom-left,
.vs-notification-container--bottom-center {
  .vs-notification-stack {
    flex-direction: column-reverse;
  }
}
</style> 