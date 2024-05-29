import { ECalcStatus, type ICalcResult } from 'entities/stores/calculation/types'
import styles from './styles.module.scss'

export const getCharacterValues = (calcResult: ICalcResult | null): string[] => {
  if (calcResult === null) {
    return ['', '']
  }
  const surfaceArea = calcResult?.Units?.SurfaceArea?.Value ?? 0
  const grossPrice = calcResult?.Price?.GrossPrice ?? 0
  const price =
    (grossPrice !== undefined &&
     surfaceArea !== undefined &&
     surfaceArea !== 0)
      ? (grossPrice / surfaceArea).toFixed(2)
      : 0
  return [price, grossPrice].map(item => item.toString())
}

export const getPriceTextStyle = (calcStatus: ECalcStatus): string =>
  `${styles.rows as string} 
   ${(calcStatus === ECalcStatus.Success ? styles.priceTextSuccess : '') as string}`

export const getPriceResultStyle = (calcStatus: ECalcStatus): string =>
  `${styles.priceResult as string} 
   ${(calcStatus === ECalcStatus.Fail ? styles.priceResultFail : '') as string}`

export const getLegendStyle = (calcStatus: ECalcStatus): string =>
  `${styles.legend as string} 
   ${(calcStatus === ECalcStatus.Fail ? styles.legendFail : '') as string}`
