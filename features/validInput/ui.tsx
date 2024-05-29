import styles from './styles.module.scss'
import { type IValidInput } from './types'

export const ValidInput = (props: IValidInput): JSX.Element => {
  const { id, value, type, isValid, disabled, placeholder, width, setValue } = props
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (setValue) {
      setValue(id, e.target.value)
    }
  }

  const getInputClassName = (): string =>
    `${styles.input as string}
     ${(isValid ? '' : styles.inputInvalid) as string}`

  return (
    <input
      type={type}
      id={id}
      className={getInputClassName()}
      placeholder={placeholder}
      style={{ width: width ?? 'auto' }}
      onChange={changeHandler}
      disabled = {disabled}
      value={value}>
    </input>
  )
}
