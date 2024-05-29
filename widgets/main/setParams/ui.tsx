import { observer } from 'mobx-react'
import { useProductStore } from 'entities/hooks/useStores'
import { getPropertyControls, getParentChildProperties } from './model'
import { EPart } from './types'
import styles from './styles.module.scss'

export const SetParams = observer((): JSX.Element => {
  const productStore = useProductStore()
  const { productProperties, selector } = productStore
  const props = getParentChildProperties(productProperties, selector)
  return (
    <fieldset className={styles.setParams}>
      <legend className={styles.legend}>Параметры</legend>
      <div className={styles.rowsLeft}>
        {getPropertyControls(props, EPart.Left)}
      </div>
      <div className={styles.rowsRight}>
        {getPropertyControls(props, EPart.Right)}
      </div>
    </fieldset>
  )
})
