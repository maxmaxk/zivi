import { type ICheckbox } from './types'
import styles from './styles.module.scss'

export const Checkbox = (props: ICheckbox): JSX.Element => {
  const { id, value, disabled = false, area, theme = 'black', setValue, shiftClick } = props
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.checked)
  }
  const inputStyle = theme === 'black' ? styles.black : styles.orange
  const areaStyle = area !== undefined ? { gridArea: `area-${area as unknown as string}` } : {}
  const clickHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (e.shiftKey && shiftClick) shiftClick()
  }
  return (
    <input
      type='checkbox'
      style={areaStyle}
      id={id}
      className={`${styles.input as string} ${inputStyle as string}`}
      checked={value}
      onChange={changeHandler}
      disabled={disabled}
      onClick={clickHandler}>
    </input>
  )
}
