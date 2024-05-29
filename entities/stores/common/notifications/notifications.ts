import { type NOTIFICATION_TYPE, Store } from 'react-notifications-component'
import { type IErrorNotification } from 'shared/axios/types'
import { duration } from './consts'

export class Notifications {
  logoutHandler: (() => void) | null = null
  lastTitle = ''
  skipFlag = false
  constructor () {
    if ((Notifications as any)._instance) {
      return (Notifications as any)._instance
    }
    (Notifications as any)._instance = this
  }

  setHandler (logoutHandler: () => void): void {
    this.logoutHandler = logoutHandler
  }

  notification (title: string, message: string, type: NOTIFICATION_TYPE): void {
    Store.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration,
        onScreen: true
      }
    })
  }

  errorNotification (props: IErrorNotification): void {
    const { title, logout } = props
    if (logout) {
      if (this.logoutHandler) this.logoutHandler()
      return
    }
    if (!this.skipFlag || title !== this.lastTitle) {
      this.notification(title, 'Ошибка при обращении к сервису', 'danger')
      this.lastTitle = title
      this.skipFlag = true
      setTimeout(() => {
        this.skipFlag = false
      }, duration)
    }
  }

  successNotification (title: string): void {
    this.notification(title, 'Операция выполнена успешно', 'success')
  }
}
