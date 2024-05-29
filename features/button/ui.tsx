import { memo } from 'react'
import styles from './styles.module.scss'
import { type IButton } from './types'

const Button = memo(({ title, area, styleName, disabled = false, comment, onClickHandler }: IButton): JSX.Element => {
  const areaStyle = area !== undefined ? { gridArea: `area-${area}` } : {}
  return (
    <button
      className={styles[styleName]}
      style={areaStyle}
      disabled = {disabled}
      title={comment}
      onClick={onClickHandler}>
        {title}
    </button>
  )
})
Button.displayName = 'Button'
export { Button }
