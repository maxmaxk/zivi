import { observer } from 'mobx-react'
import { characterTitles } from './consts'
import { useCalculationStore } from 'entities/hooks/useStores'
import { getCharacterValues } from './model'
import styles from './styles.module.scss'

export const Characters = observer((): JSX.Element => {
  const calculationStore = useCalculationStore()
  const { calcResult } = calculationStore
  const characterValues = getCharacterValues(calcResult)
  return (
    <fieldset className={styles.characters}>
      <div className={styles.legend}>Характеристики</div>
      <div className={styles.rows}>
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
