import { TableCaptions } from 'features/tableCaptions'
import { DataRow } from './dataRow'
import { observer } from 'mobx-react'
import { useLogCalcStore } from 'entities/hooks/useStores'
import styles from './styles.module.scss'

export const LogCalcsTable = observer((): JSX.Element => {
  const logCalcsStore = useLogCalcStore()
  return (
    <table className={styles.calcsList}>
      <colgroup>
        <col className={styles.calcs__colNum}/>
        <col className={styles.calcs__colDateTime}/>
        <col className={styles.calcs__colNomenclature}/>
        <col className={styles.calcs__colClientApp}/>
        <col className={styles.calcs__colId}/>
        <col className={styles.calcs__colHashCalc}/>
      </colgroup>
      <thead>
        <TableCaptions titles={['№\nп/п', 'Дата и время расчёта', 'Наименование номенклатуры', 'Приложение', 'ID пакета', 'Хеш расчёта']}/>
      </thead>
      <tbody>
        <DataRow data={logCalcsStore.logs}/>
      </tbody>
    </table>
  )
})
