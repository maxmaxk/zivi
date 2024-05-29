import commonStyles from 'features/header/markMenu/styles.module.scss'
import { type ILoginInput } from './types'
import { isLoginValid } from 'shared/utils/validators'
import { isEmailValid } from 'shared/utils/validators/common/valid'
import { useEffect } from 'react'
import { Tooltip } from 'features/tooltip'

export const LoginInput = (props: ILoginInput): JSX.Element => {
  const { setLoginValid, setEmailValid, setLogin, placeholder, tooltip } = props
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginValid(isLoginValid(e.target.value))
    setLogin(e.target.value)
    if (setEmailValid) setEmailValid(isEmailValid(e.target.value))
  }
  useEffect(() => {
    setLoginValid(false)
    if (setEmailValid) setEmailValid(false)
  }, [])
  return (
    <div className={commonStyles.boxFieldMark}>
    <input type="text" placeholder={placeholder} onChange={handler}/>
      <Tooltip tooltipContent={tooltip}/>
    </div>
  )
}
