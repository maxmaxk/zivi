import { type ICloseIcon } from './types'
import styles from './styles.module.scss'

export const CloseIcon = ({ iconStyle, onClose }: ICloseIcon): JSX.Element => {
  return (
    <span
      className={`${styles.closeIcon as string} ${styles[iconStyle] as string}`}
      onClick={onClose}>
    </span>
  )
}
