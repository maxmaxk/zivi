import { downloadFileRequest } from 'shared/api/downloadFile'
import styles from './styles.module.scss'
import { type IDownloadLink } from './types'
import { Notifications } from 'entities/stores/common/notifications'
import { getMessage } from 'shared/axios/messages'
import { type AxiosError } from 'axios'
import { downloadFile } from './model'

const notifications = new Notifications()
export const downloadRequest = async (id: string, filename: string): Promise<void> => {
  await downloadFileRequest(id)
    .then(data => {
      downloadFile(data, filename)
    })
    .catch((error: unknown) => {
      notifications.errorNotification(getMessage(error as AxiosError, 'download file request error'))
    })
}

export const DownloadLink = ({ title, id }: IDownloadLink): JSX.Element => {
  const downloadHandler = async (): Promise<void> => {
    await downloadRequest(id, title)
  }
  return (
    <span
      className={styles.downloadLink}
      onClick={() => { void downloadHandler() }}>
        {title}
    </span>
  )
}
