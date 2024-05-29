import { Zivi } from './zivi'
import { Logo } from './logo'
import { ItemsPanel } from './itemsPanel'
import { IviText } from './iviText'
import styles from './styles.module.scss'
import { useUserStore } from 'entities/hooks/useStores'
import { ELoginStatus } from 'entities/stores/user/types'
import { observer } from 'mobx-react'

export const Header = observer((): JSX.Element => {
  const userStore = useUserStore()
  const isLoginStyle = userStore.loginStatus === ELoginStatus.Logined || userStore.loginStatus === ELoginStatus.Logining
  const loginStyle = isLoginStyle ? styles.login : styles.guest
  return (
    <header className={`${styles.header as string} ${loginStyle as string}`}>
      { !isLoginStyle && <Zivi/> }
      <Logo/>
      <ItemsPanel/>
      { !isLoginStyle && <IviText/> }
    </header>
  )
})
