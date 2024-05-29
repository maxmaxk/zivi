import { useRootStore } from 'entities/hooks/useStores'
import styles from './styles.module.scss'
import { observer } from 'mobx-react'

export const Waiting = observer((): JSX.Element => {
  const { waiting } = useRootStore()
  return (
    <div className={waiting ? styles.waitIconEnabled : styles.waitIconDisabled}/>
  )
})
