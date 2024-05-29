import { navItems } from './consts'
import { type INavbar } from './types'
import styles from './styles.module.scss'
import { NavItem } from 'features/navItem'
import { EItemType } from 'features/navItem/types'

export const Navbar = ({ tab, setTab }: INavbar): JSX.Element => {
  return (
    <nav className={styles.nav}>
      {navItems.map(item => (
        <NavItem
          key={item.tab}
          id={item.tab as unknown as string}
          title={item.title}
          selected={tab === item.tab}
          itemType={EItemType.OrderNav}
          onClickHandler={setTab}
        />
      ))}
    </nav>
  )
}
