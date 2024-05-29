import { type AxiosError } from 'axios'
import { Notifications } from '../common/notifications'
import { TableChecks } from '../common/tableChecks'
import { getMessage } from 'shared/axios/messages'
import { getHistory } from 'shared/api/getHistory'
import { type IHistoryResponse } from './types'
import { EStyleType } from '../common/tableChecks/types'
import { flow, makeObservable, observable } from 'mobx'

export class HistoryStore extends TableChecks {
  notifications: Notifications

  constructor () {
    super()
    this.data = []
    this.notifications = new Notifications()
    makeObservable(this, {
      data: observable,
      getHistory: flow
    })
  }

  * getHistory (id: string): Generator {
    try {
      const getHistoryResponse = (yield getHistory(id)) as IHistoryResponse
      this.data = getHistoryResponse.data.map((item) => ({
        id: item.id,
        styleType: new Set<EStyleType>([EStyleType.Normal]),
        values: {
          date: { value: item.date.replace('T', ' ') },
          name: { value: item.name, align: 'left' },
          user: { value: item.user }
        }
      }))
    } catch (error) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getHistory request error'))
    }
  }
}
