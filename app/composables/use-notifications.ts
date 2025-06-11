import { type NotificationsDTO, useNotificationsStore } from '@app/store/notifications.store'

export const useNotifications = () => {
  const store = useNotificationsStore()

  const create = (notification: Omit<NotificationsDTO, 'id' | 'createdAt'>) => store.addNotification(notification)
  const remove = (id: string) => store.removeNotification(id)
  const clear = () => store.clearNotifications()

  return {
    notifications: store.notifications,
    create,
    remove,
    clear,
  }
}
