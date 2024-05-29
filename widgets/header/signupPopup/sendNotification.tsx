import { type ISendNotification } from './types'
import commonStyles from 'features/header/markMenu/styles.module.scss'
import { useEffect } from 'react'
import { useUserStore } from 'entities/hooks/useStores'
import { observer } from 'mobx-react'

export const SendNotification = observer(({ email }: ISendNotification): JSX.Element => {
  const userStore = useUserStore()
  const { startReg } = userStore
  useEffect(() => {
    userStore.resetStartReg()
  }, [email])
  if (!startReg) return <></>
  return (
    <>
      <p className={commonStyles.notice}>На электронную почту<br/><span>{email}</span><br/>отправлено письмо<br/>со специальной ссылкой.</p>
      <p className={commonStyles.notice}>Для продолжения регистрации<br/>перейдите по ссылке в письме.</p>
    </>
  )
})
