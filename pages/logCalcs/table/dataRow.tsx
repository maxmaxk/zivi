import { type ILogProps } from './types'
import styles from './styles.module.scss'

export const DataRow = ({ data }: ILogProps): JSX.Element => {
  return (
    <>
      {data?.map((item) => {
        const date = item.date.split('T')
        return (
          <tr className={styles.calcRow} key={item.id}>
            <td className={styles.rowCellNum}>
              {item.num}
            </td>
            <td className={styles.cellDateTime}>
              <p className={styles.cellDateTime}>{date[0]}</p>
              <p className={`${styles.cellDateTime as string} ${styles.cellDateTime2 as string}`}>{date[1]}</p>
            </td>
            <td>
              {item.name}
            </td>
            <td className={styles.cellClientApp}>
              {item.application}
            </td>
            <td className={styles.rowCellId}>
              {item.packId}
            </td>
            <td className={styles.cellHashCalc}>
              {item.hash}
            </td>
          </tr>
        )
      })}
    </>
  )
}
