import commonStyles from 'features/header/markMenu/styles.module.scss'
import { useUserStore } from 'entities/hooks/useStores'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { type ISendNotification } from './types'

export const SendNotification = observer(({ login }: ISendNotification): JSX.Element => {
  const userStore = useUserStore()
  const { startRecoveryPassword } = userStore
  useEffect(() => {
    userStore.resetStartRecoveryPassword()
  }, [login])
  if (!startRecoveryPassword) return <></>
  return (
    <>
      <p className={commonStyles.notice}>На электронную почту аккаунта отправлено письмо<br/>со специальной ссылкой.</p>
      <p className={commonStyles.notice}>Для восстановления пароля<br/>перейдите по ссылке в письме.</p>
    </>
  )
})
