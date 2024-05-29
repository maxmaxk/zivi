import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flowResult } from 'mobx'
import { signContentStyle } from 'features/popupStyles'
import { EmailInput } from 'features/header/accountInput/emailInput'
import { type ISignupPopup } from './types'
import { LoginInput } from 'features/header/accountInput/loginInput'
import { newLogin } from 'features/tooltips/newLogin'
import { newPassword } from 'features/tooltips/newPassword'
import { PasswordInput } from 'features/header/accountInput/passwordInput'
import { LinkedCheckbox } from 'features/linkedCheckbox'
import { options } from './consts'
import { SendNotification } from './sendNotification'
import { useUserStore } from 'entities/hooks/useStores'
import commonStyles from 'features/header/markMenu/styles.module.scss'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { observer } from 'mobx-react'
import { ReactSelect } from 'features/reactSelect'
import styles from './styles.module.scss'
import { ELawStatus } from 'shared/api/makeRegistration'

export const SignupPopup = observer(({ confirm, email }: ISignupPopup): JSX.Element => {
  const [loginValid, setLoginValid] = useState<boolean>(false)
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [login, setLogin] = useState<string>('')
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [passwordConfirmValid, setPasswordConfirmValid] = useState<boolean>(false)
  const [agree, setAgree] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [regEmail, setRegEmail] = useState<string>('')
  const [customerType, setCustomerType] = useState<ELawStatus>(ELawStatus.Unknown)
  const userStore = useUserStore()
  const { isLoading, startReg } = userStore
  const navigate = useNavigate()
  const regStartHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    void flowResult(userStore.getRegistration(regEmail))
  }
  const changeHandler = (id: string, value: string): void => {
    if (id === 'customerType') setCustomerType(value as ELawStatus)
  }
  const makeRegHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    void flowResult(userStore.makeRegistration(login, password, customerType))
      .then((token) => {
        if (token) {
          navigate('/')
        }
      })
  }
  return (
    <Popup
      trigger={open => (
        <div
          className={`${commonStyles.markMenu as string} ${(open ? commonStyles.markOpenMenu : '') as string}`}
          title="Форма регистрации">
            Регистрация
        </div>
      )}
      position='bottom right'
      open={confirm}
      closeOnDocumentClick={!confirm}
      arrow={false}
      contentStyle={signContentStyle}>
      <form className={commonStyles.boxForm}>
        <EmailInput setValid={setEmailValid} setRegEmail={setRegEmail} email={email}/>
        {confirm && <>
          <div className={styles.selectContainer}>
            <ReactSelect
              id='customerType'
              placeHolder='Ваш правовой статус'
              defaultOpenPlaceHolder='Ваш правовой статус'
              centered={true}
              value={customerType}
              options={options}
              isValid={true}
              valueChangeHandler={changeHandler}
            />
          </div>
          <LoginInput
            setLoginValid={setLoginValid}
            setLogin={setLogin}
            placeholder='(новый логин)'
            tooltip={newLogin}
          />
          <PasswordInput
            setPasswordValid={setPasswordValid}
            disabled={!loginValid}
            tooltip={newPassword}
            placeholder='(введите пароль)'
            password={password}
            setPassword={setPassword}
          />
          <PasswordInput
            setPasswordValid={setPasswordConfirmValid}
            disabled={!loginValid || !passwordValid}
            placeholder='(повторите пароль)'
            password={passwordConfirm}
            setPassword={setPasswordConfirm}
          />
          <LinkedCheckbox title='Соглашение' link='/' blank={true} value={agree} setValue={setAgree}/>
          <button
            disabled={
              !loginValid ||
              !passwordValid ||
              !passwordConfirmValid ||
              !agree ||
              (password !== passwordConfirm) ||
              (customerType === ELawStatus.Unknown)
            }
            onClick={makeRegHandler}>
              Зарегистрироваться
          </button>
        </>}
        {!confirm &&
          <button disabled={!emailValid || isLoading} onClick={regStartHandler}>
            {startReg ? 'Отправить ссылку повторно' : 'Продолжить регистрацию'}
          </button>
        }
        <SendNotification email={regEmail}/>
      </form>
  </Popup>
  )
})
