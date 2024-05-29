import { useParams } from 'react-router'
import { ENavTabs, Navbar } from 'widgets/account/navbar'
import { Controls } from './controls'
import { LogCalcsTable } from './table'
import { useLogCalcStore } from 'entities/hooks/useStores'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import styles from './styles.module.scss'

export const LogCalcs = observer((): JSX.Element => {
  const { tabnum } = useParams()
  const tab = tabnum ? parseInt(tabnum) : ENavTabs.None as number
  const logCalcsStore = useLogCalcStore()

  useEffect(() => {
    logCalcsStore.getConfigs()
  }, [])

  return (
    <>
      <Navbar tab={tab}/>
      <main className={styles.main}>
        <div className={styles.objectBar}>
          <Controls />
        </div>
        <LogCalcsTable />
      </main>
    </>
  )
})
