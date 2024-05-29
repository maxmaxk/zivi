import styles from './styles.module.scss'
import { type IMenuItem } from './types'

export const MenuItem = ({ title }: IMenuItem): JSX.Element => {
  return (
    <div className={styles.menuItem}>
      {title}
    </div>
  )
}
