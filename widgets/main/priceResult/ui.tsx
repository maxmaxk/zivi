import { observer } from 'mobx-react'
import { characterTitles } from './consts'
import { useCalculationStore } from 'entities/hooks/useStores'
import { getCharacterValues, getLegendStyle, getPriceResultStyle, getPriceTextStyle } from './model'
import styles from './styles.module.scss'

export const PriceResult = observer((): JSX.Element => {
  const calculationStore = useCalculationStore()
  const { calcResult, calcStatus } = calculationStore
  const characterValues = getCharacterValues(calcResult)
  return (
    <fieldset className={getPriceResultStyle(calcStatus)}>
      <div className={getLegendStyle(calcStatus)}>Цены</div>
      <div className={getPriceTextStyle(calcStatus)}>
        {characterTitles.map((characterTitle, index) => (
          <div key={characterTitle} className={styles.rowCharacter}>
            <span className={styles.characterTitle}>{characterTitle}</span>
            <span className={styles.characterValue}>{characterValues[index]}</span>
          </div>
        ))}
      </div>
    </fieldset>
  )
})
