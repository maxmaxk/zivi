import commonStyles from 'features/header/markMenu/styles.module.scss'
import { type IPasswordInput } from './types'
import { isPasswordValid } from 'shared/utils/validators'
import { useEffect } from 'react'
import { Tooltip } from 'features/tooltip'

export const PasswordInput = (props: IPasswordInput): JSX.Element => {
  const { disabled, setPasswordValid, tooltip, placeholder, password, setPassword } = props
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValid(isPasswordValid(e.target.value))
    if (setPassword) setPassword(e.target.value)
  }
  useEffect(() => {
    setPasswordValid(false)
  }, [])
  return (
    <div className={commonStyles.boxFieldMark}>
    <input
      type="password"
      placeholder={placeholder}
      disabled={disabled}
      value={password}
      onChange={handler}/>
      <Tooltip tooltipContent={tooltip}/>
    </div>
  )
}
