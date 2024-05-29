import styles from './styles.module.scss'
import { Header } from 'widgets/main/header'
import { MasterSets } from '../masterSets'
import { type IMaster } from './types'
import { useProductStore } from 'entities/hooks/useStores'
import { useEffect } from 'react'

export const Master = ({ isDemo, closeHandler }: IMaster): JSX.Element => {
  const productStore = useProductStore()
  useEffect(() => {
    productStore.getProductTypes()
  }, [])
  return (
    <div className={isDemo ? styles.master : styles.masterMini}>
      <Header isDemo={isDemo} closeHandler={closeHandler}/>
      <MasterSets isDemo={isDemo} closeHandler={closeHandler}/>
    </div>
  )
}
