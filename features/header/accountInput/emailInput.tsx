import { type IEmailInput } from './types'
import commonStyles from 'features/header/markMenu/styles.module.scss'
import { Tooltip } from 'features/tooltip'
import { useEffect, useState } from 'react'
import { isEmailValid } from 'shared/utils/validators/common/valid'
import { enterRegPassword } from '../../tooltips/enterRegPassword'

export const EmailInput = ({ setValid, setRegEmail, email }: IEmailInput): JSX.Element => {
  const [emailValid, setEmailValid] = useState<boolean>(true)
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const emailValid = isEmailValid(e.target.value)
    setValid(emailValid)
    setEmailValid(emailValid || e.target.value === '')
    if (setRegEmail) setRegEmail(e.target.value)
  }
  const emailPresent = email !== ''
  useEffect(() => {
    setValid(false)
    if (setRegEmail) setRegEmail('')
  }, [])
  return (
    <div className={commonStyles.boxFieldMark}>
      <input
        className={emailValid ? '' : commonStyles.error}
        type="email"
        placeholder="(введите e-mail)"
        onChange={emailPresent ? undefined : handler}
        value={emailPresent ? email : undefined}
        disabled={emailPresent}/>
      {!emailPresent && <Tooltip tooltipContent={enterRegPassword}/>}
    </div>
  )
}
