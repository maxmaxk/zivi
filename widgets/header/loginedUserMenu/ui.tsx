import { observer } from 'mobx-react'
import { useUserStore } from 'entities/hooks/useStores'
import { LogoutButton } from 'features/header/logoutButton'
import styles from './styles.module.scss'
import 'reactjs-popup/dist/index.css'

export const LoginedUserMenu = observer((): JSX.Element => {
  const userStore = useUserStore()
  const { userName } = userStore
  return (
    <>
      <div className={styles.rightItem}></div>
      <div className={styles.userName}>
        <span>{userName}</span>
        <LogoutButton/>
      </div>
    </>
  )
})
