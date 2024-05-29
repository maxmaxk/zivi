import { useUserStore } from 'entities/hooks/useStores'
import styles from './styles.module.scss'
import { ELoginStatus } from 'entities/stores/user/types'
import { observer } from 'mobx-react'

export const Body = observer((props: React.PropsWithChildren): JSX.Element => {
  const userStore = useUserStore()
  const isLoginStyle = userStore.loginStatus === ELoginStatus.Logined || userStore.loginStatus === ELoginStatus.Logining
  const loginStyle = isLoginStyle ? styles.login : styles.guest
  return (
    <div className={`${styles.body as string} ${loginStyle as string}`}>
      {props.children}
    </div>
  )
})
