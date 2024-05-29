import { MenuItem } from 'features/header/menuItem'
import styles from './styles.module.scss'
import { items } from './consts'

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.items}>
      {items.map(item => <MenuItem title={item} key={item}/>)}
      <address>© Заказ ИВИ, 2023</address>
    </div>
    </footer>
  )
}
