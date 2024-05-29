import { type AxiosError } from 'axios'
import type { IErrorNotification, IGetMessagesResult } from './types'
import { badTokenString, expiredMessage, maxMessageLength } from './consts'

const getHumanMessage = (message: string): IErrorNotification => {
  if (message.includes(badTokenString)) return { title: badTokenString, logout: true }
  if (message.includes(expiredMessage)) return { title: expiredMessage, logout: true }
  return { title: message.slice(0, maxMessageLength) }
}

export const getMessages = (error: AxiosError): IGetMessagesResult => ({
  axiosMessage: error.message,
  customMessage: (error.response?.data as any)?.error ?? error?.response?.data ?? undefined
})

export const getMessage = (error: AxiosError, defaultMessage: string): IErrorNotification => {
  const { axiosMessage, customMessage } = getMessages(error)
  return getHumanMessage(customMessage ?? axiosMessage ?? defaultMessage)
}
