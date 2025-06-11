import { defineStore } from 'pinia'

export interface NotificationData {
  id: string
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
  createdAt: number
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as NotificationData[]
  }),

  actions: {
    addNotification(notification: Omit<NotificationData, 'id' | 'createdAt'>) {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const newNotification: NotificationData = {
        ...notification,
        id,
        createdAt: Date.now(),
        position: notification.position || 'bottom-right'
      }
      
      this.notifications.push(newNotification)
      
      // Auto-remove if duration is set
      if (typeof notification.duration === 'number') {
        setTimeout(() => {
          this.removeNotification(id)
        }, notification.duration)
      }
      
      return {
        id,
        close: () => this.removeNotification(id),
        changeProgress: (value: number) => {
          const notif = this.notifications.find(n => n.id === id)
          if (notif) {
            notif.progress = Math.max(0, Math.min(100, value))
          }
        }
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