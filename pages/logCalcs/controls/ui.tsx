import { observer } from 'mobx-react'
import { type ChangeEvent, useState, useEffect } from 'react'
import { type IFilters } from './types'
import { Caption } from 'features/caption'
import { ReactSelect } from 'features/reactSelect'
import { useParams } from 'react-router'
import { useDebounce } from 'entities/hooks/useDebounce'
import { useLogCalcStore } from 'entities/hooks/useStores'
import styles from './styles.module.scss'

export const Controls = observer((): JSX.Element => {
  const logCalcsStore = useLogCalcStore()
  const { id } = useParams()
  const packId = id && id !== '0' ? id : ''
  const initState = {
    configId: '',
    search: packId,
    from: '',
    to: ''
  }
  const [filters, setFilter] = useState<IFilters>(initState)
  const debouncedValue = useDebounce(filters)

  useEffect(() => {
    logCalcsStore.getLogCalcs(filters)
  }, [debouncedValue])

  const filterHandler = (name: string, value: string): void => {
    setFilter(prevFilters => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const inputHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>): void => {
    filterHandler(name, value)
  }

  return (
    <>
      <Caption title='Журнал расчётов' area={1}/>
      <div className={styles.objectRequisites}>
        <div className={styles.requisiteCountTotalLabel}>Всего расчётов</div>
        <div className={styles.requisiteCountTotalValue}>{logCalcsStore.requisiteCountTotalValue.toLocaleString()}</div>
      </div>
      <div className={styles.objectControls}>
        <div className={styles.objectControls__set1}>
          <label>Период</label>
          <input name='from' type='date' onChange={inputHandler}/>
          <input name='to' type='date' onChange={inputHandler}/>
        </div>
        <div className={styles.objectControls__set2}>
          <label title='Конфигурация расчёта (Производитель)'>Конфигурация</label>
          <div className={styles.select}>
            <ReactSelect id='configId' isValid options={logCalcsStore.setConfig(logCalcsStore.configs)} valueChangeHandler={filterHandler}/>
          </div>
        </div>
        <div className={styles.objectControls__set3}>
          <label>Поиск</label>
          <input name='search' type='search' placeholder='(введите значение)' value={filters.search} onChange={inputHandler}/>
        </div>
      </div>
    </>
  )
})
