import { useEffect } from 'react'

export function useNotification(): [() => void, (title: string, options?: NotificationOptions) => Notification | null] {
  const requestPermissionToUseNotification = (): void => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      window.Notification.requestPermission()
    }
  }

  const createNotification = (title: string, options?: NotificationOptions): Notification | null => {
    if (window.Notification && window.Notification.permission !== 'denied') {
      return new window.Notification(title, options)
    }
    return null
  }

  useEffect(() => {
    requestPermissionToUseNotification()
  }, [])

  return [requestPermissionToUseNotification, createNotification]
}
