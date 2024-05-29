import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flowResult } from 'mobx'
import { useAccountStore } from 'entities/hooks/useStores'
import { useParams } from 'react-router'
import { ChangeMailContent } from './model'
import styles from '../main/styles.module.scss'
import { PopupMessage } from 'features/popupMessage'

export const ChangeMail = (): JSX.Element => {
  const [messageText, setMessageText] = useState<string>('')
  const [openmessage, setOpenMessage] = useState<boolean>(false)
  const { id } = useParams()
  const accountStore = useAccountStore()
  const navigate = useNavigate()
  useEffect(() => {
    flowResult(accountStore.changeMail(id ?? ''))
      .then((res) => {
        if (res) {
          setMessageText('Новый почтовый адрес успешно привязан')
          setOpenMessage(true)
        }
        navigate('/')
      })
      .catch((_err) => {
        navigate('/')
      })
  }, [])
  return (
    <main className={styles.main}>
      <ChangeMailContent/>
      <PopupMessage
        messageType='success'
        messageText={messageText}
        open={openmessage}
        setOpen={setOpenMessage}
      />
    </main>
  )
}
