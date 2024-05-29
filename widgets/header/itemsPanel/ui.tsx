import styles from './styles.module.scss'
import { MenuItem } from 'features/header/menuItem'
import { BoxMenu } from 'widgets/header/boxMenu'
import { items } from './consts'

export const ItemsPanel = (): JSX.Element => {
  return (
    <nav className={styles.area}>
      {items.map(item => <MenuItem title={item} key={item}/>)}
      <BoxMenu/>
    </nav>
  )
}
