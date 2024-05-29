import { useState } from 'react'
import { ENavTabs, Navbar } from '../navbar'
import { DrawTab } from '../drawTab'
import styles from './styles.module.scss'

export const Draw = (): JSX.Element => {
  const [tab, setTab] = useState<ENavTabs>(ENavTabs.Draw3D)
  return (
    <fieldset className={styles.setDraw}>
      <Navbar tab={tab} setTab={setTab}/>
      <DrawTab tab={tab}/>
    </fieldset>
  )
}
