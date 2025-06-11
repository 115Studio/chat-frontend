<template>
  <div class="absolute bottom-0 right-0">
    <transition-group
      name="fade"
      tag="div"
    >
      <Notification
        v-for="(notification) in notifications"
        :key="notification.id"
        :title="notification.title"
        :text="notification.text"
        @close="remove(notification.id)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '@app/composables/use-notifications'

const { notifications, create, remove } = useNotifications()

setInterval(() => {
  create({
    title: 'New Notification',
    text: 'This is a sample notification message.',
    duration: 3000
  })
}, 2000)
</script>

<style scoped lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
