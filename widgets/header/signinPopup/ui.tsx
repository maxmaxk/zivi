import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flowResult } from 'mobx'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import commonStyles from 'features/header/markMenu/styles.module.scss'
import { signContentStyle } from 'features/popupStyles'
import { LoginInput } from '../../../features/header/accountInput/loginInput'
import { PasswordInput } from '../../../features/header/accountInput/passwordInput'
import { EmailInput } from '../../../features/header/accountInput/emailInput'
import { type ISigninPopup } from './types'
import { enterLogin } from '../../../features/tooltips/enterLogin'
import { enterPassword } from '../../../features/tooltips/enterPassword'
import { newPassword } from '../../../features/tooltips/newPassword'
import { useUserStore } from 'entities/hooks/useStores'
import { SendNotification } from './sendNotification'
import { PopupMessage } from 'features/popupMessage'

export const SigninPopup = ({ confirm, userName }: ISigninPopup): JSX.Element => {
  const [loginValid, setLoginValid] = useState<boolean>(false)
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [login, setLogin] = useState<string>('')
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [passwordConfirmValid, setPasswordConfirmValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [messageText, setMessageText] = useState<string>('')
  const [openmessage, setOpenMessage] = useState<boolean>(false)
  const userStore = useUserStore()
  const navigate = useNavigate()
  const cancelHandler = (): void => {
    userStore.resetLoginStatus()
    navigate('/')
  }
  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    void flowResult(userStore.auth(login, password))
      .then(res => {
        if (res === false) {
          setMessageText('Логин или пароль указаны неверно')
          setOpenMessage(true)
        }
      })
  }
  const resetPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    void flowResult(userStore.initRecoveryPassword(login, emailValid))
  }
  const changePasswordHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    void flowResult(userStore.changePassword(password))
      .then((token) => {
        if (token) {
          navigate('/')
        }
      })
  }
  return (
    <>
      <Popup
        trigger={open => (
          <div
            className={`${commonStyles.markMenu as string} ${(open ? commonStyles.markOpenMenu : '') as string}`}
            title="Форма входа в систему">
              Вход
          </div>
        )}
        position='bottom right'
        open={confirm}
        closeOnDocumentClick={!confirm}
        arrow={false}
        contentStyle={signContentStyle}>
          {!confirm && <form className={commonStyles.boxForm}>
            <LoginInput
              setLoginValid={setLoginValid}
              setEmailValid={setEmailValid}
              setLogin={setLogin}
              placeholder='(логин/e-mail)'
              tooltip={enterLogin}/>
            <PasswordInput
              disabled={!loginValid}
              setPasswordValid={setPasswordValid}
              setPassword={setPassword}
              tooltip={enterPassword}
              placeholder='(введите пароль)'/>
            <button
              disabled={!loginValid || !passwordValid}
              onClick={loginHandler}>Войти
            </button>
            <button
              disabled={!loginValid && !emailValid}
              onClick={resetPasswordHandler}>
                Сброс пароля&hellip;
            </button>
            <SendNotification login={login}/>
          </form>}
          {confirm && <form className={commonStyles.boxForm}>
            <EmailInput setValid={setEmailValid} email={userName}/>
            <PasswordInput
              setPasswordValid={setPasswordValid}
              disabled={false}
              tooltip={newPassword}
              placeholder='(введите пароль)'
              password={password}
              setPassword={setPassword}
            />
            <PasswordInput
              setPasswordValid={setPasswordConfirmValid}
              disabled={!passwordValid}
              placeholder='(повторите пароль)'
              password={passwordConfirm}
              setPassword={setPasswordConfirm}
            />
            <button
              disabled={!passwordValid || !passwordConfirmValid || password !== passwordConfirm}
              onClick={changePasswordHandler}>Сменить пароль
            </button>
            <button onClick={cancelHandler}>Отмена</button>
          </form>}
      </Popup>
      <PopupMessage
        messageType='fail'
        messageText={messageText}
        open={openmessage}
        setOpen={setOpenMessage}
      />
    </>
  )
}
