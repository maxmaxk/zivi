import { ECalcStatus } from 'entities/stores/calculation/types'
import styles from './styles.module.scss'

export const getLegendTitle = (calcStatus: ECalcStatus): string =>
  calcStatus === ECalcStatus.Fail ? 'Ошибка!' : 'Результат расчёта'

export const getResultText = (calcStatus: ECalcStatus, calcPrintResult: string | undefined, calcError: string): string =>
  calcStatus === ECalcStatus.Empty
    ? '(укажите значения параметров и нажмите кнопку «Рассчитать изделие»)'
    : calcStatus === ECalcStatus.Success
      ? calcPrintResult ?? ''
      : calcError

export const getCalcTextStyle = (calcStatus: ECalcStatus): string =>
  `${styles.calcText as string} 
   ${(calcStatus === ECalcStatus.Empty ? styles.calcTextEmpty : '') as string}
   ${(calcStatus === ECalcStatus.Success ? styles.calcTextSuccess : '') as string}`

export const getCalcResultStyle = (calcStatus: ECalcStatus): string =>
  `${styles.calcResult as string} 
   ${(calcStatus === ECalcStatus.Fail ? styles.calcResultFail : '') as string}`

export const getLegendStyle = (calcStatus: ECalcStatus): string =>
  `${styles.legend as string} 
   ${(calcStatus === ECalcStatus.Fail ? styles.legendFail : '') as string}`
