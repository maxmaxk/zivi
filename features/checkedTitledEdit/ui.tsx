import { TitledCheckbox } from 'features/titledCheckbox'
import styles from './styles.module.scss'
import { type ICheckedTitledEdit } from './types'

export const CheckedTitledEdit = (props: ICheckedTitledEdit): JSX.Element => {
  const { id, title, value, isValid, checked, setValue, setChecked } = props
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(id, e.target.value)
  }
  const getInputClassName = (): string =>
    `${styles.input as string}
     ${(isValid ? '' : styles.inputInvalid) as string}
     ${(checked ? '' : styles.inputDisabled) as string}`
  return (
    <div className={styles.edit}>
      <TitledCheckbox
        area={1}
        title={title}
        value={checked}
        setValue={setChecked}
        fontSize='normal'
      />
      <input
        type='email'
        id={id}
        className={getInputClassName()}
        onChange={changeHandler}
        disabled = {!checked}
        value={value}>
      </input>
    </div>
  )
}
