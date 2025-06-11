import { defineStore } from 'pinia'
import { NOTIFICATION_DEFAULT_DURATION } from '@app/constants/notifications'

export interface NotificationsDTO {
  id: string
  title?: string
  text?: string
  icon?: string
  position?: 'top-center' | 'bottom-left'
  width?: string
  closable?: boolean
  duration?: number // in milliseconds
  createdAt: number
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as NotificationsDTO[],
  }),

  actions: {
    addNotification(notification: Omit<NotificationsDTO, 'id' | 'createdAt'>) {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
      const newNotification: NotificationsDTO = {
        ...notification,
        id,
        createdAt: Date.now(),
        position: notification.position || 'bottom-left'
      }

      this.notifications.push(newNotification)

      setTimeout(() => {
        this.removeNotification(id)
      }, notification.duration ?? NOTIFICATION_DEFAULT_DURATION)


      return {
        id,
        close: () => this.removeNotification(id),
      }
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearNotifications() {
      this.notifications = []
    }
  }
})
