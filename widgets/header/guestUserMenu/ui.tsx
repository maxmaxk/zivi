import { observer } from 'mobx-react'
import styles from './styles.module.scss'
import { SignupPopup } from '../signupPopup'
import { SigninPopup } from '../signinPopup'
import { useUserStore } from 'entities/hooks/useStores'
import { ELoginStatus } from 'entities/stores/user/types'

export const GuestUserMenu = observer((): JSX.Element => {
  const userStore = useUserStore()
  const { loginStatus, email, userName } = userStore
  const confirmRegister = loginStatus === ELoginStatus.RegisterConfirm
  const confirmPassword = loginStatus === ELoginStatus.RecoveryPasswordConfirm
  return (
    <>
      {(confirmRegister || confirmPassword) && <div className={styles.fade}></div>}
      <div className={styles.rightItem}></div>
      <div className={styles.boxMenu}>
        <SignupPopup confirm={confirmRegister} email={email}/>
      </div>
      <div className={styles.boxMenu}>
        <SigninPopup confirm={confirmPassword} userName={userName}/>
       </div>
    </>
  )
})
