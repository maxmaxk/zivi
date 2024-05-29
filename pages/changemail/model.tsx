import { useAccountStore } from 'entities/hooks/useStores'
import { EAsyncStatus } from 'entities/stores/account/types'
import styles from './styles.module.scss'

export const ChangeMailContent = (): JSX.Element => {
  const accountStore = useAccountStore()
  const { changeMailStatus } = accountStore
  if (changeMailStatus === EAsyncStatus.Request) {
    return (
      <div className={styles.changeMail}><p>Привязка нового почтового адреса к аккаунту...</p></div>
    )
  }
  return <></>
}
