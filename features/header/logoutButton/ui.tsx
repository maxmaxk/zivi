import { useUserStore } from 'entities/hooks/useStores'
import styles from './styles.module.scss'

export const LogoutButton = (): JSX.Element => {
  const userStore = useUserStore()
  const logoutHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    userStore.logout()
  }
  return (
    <div className={styles.logoutButton} onClick={logoutHandler}>
    </div>
  )
}
