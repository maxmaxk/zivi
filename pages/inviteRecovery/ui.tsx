import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { flowResult } from 'mobx'
import { Master } from 'widgets/main/master'
import styles from '../main/styles.module.scss'
import { useUserStore } from 'entities/hooks/useStores'
import { useParams } from 'react-router'

export const InviteRecovery = (): JSX.Element => {
  const { id } = useParams()
  const userStore = useUserStore()
  const navigate = useNavigate()
  useEffect(() => {
    userStore.logout()
    void flowResult(userStore.getRegistrationEmail(id ?? ''))
      .then(res => {
        if (!res) {
          navigate('/')
        }
      })
  }, [])
  return (
    <main className={styles.main}>
      <Master isDemo={true}/>
    </main>
  )
}
