import { useNotificationStore, type NotificationData } from '../stores/notification.store'

interface NotificationOptions {
  title?: string
  text?: string
  icon?: string
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'dark' | string
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
  duration?: number | 'none'
  progress?: number | 'auto' | null
  square?: boolean
  border?: boolean
  flat?: boolean
  width?: string
  closable?: boolean
}

interface NotificationInstance {
  close: () => void
  changeProgress: (value: number) => void
}

export const useNotification = () => {
  const store = useNotificationStore()

  const notification = (options: NotificationOptions): NotificationInstance => {
    // Set default values
    const defaultOptions: NotificationOptions = {
      position: 'bottom-right',
      duration: 4000,
      closable: true,
      ...options
    }

    return store.addNotification(defaultOptions)
  }

  // Convenience methods for different types
  const success = (options: Omit<NotificationOptions, 'color'>) =>
    notification({ ...options, color: 'success' })

  const error = (options: Omit<NotificationOptions, 'color'>) =>
    notification({ ...options, color: 'danger' })

  const warning = (options: Omit<NotificationOptions, 'color'>) =>
    notification({ ...options, color: 'warning' })

  const info = (options: Omit<NotificationOptions, 'color'>) =>
    notification({ ...options, color: 'primary' })

  return {
    notification,
    success,
    error,
    warning,
    info
  }
} 