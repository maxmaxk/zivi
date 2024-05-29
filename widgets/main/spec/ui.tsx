import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'
import { SpecLine, ESpecLineType } from 'features/specLine'
import { useCalculationStore, useProductStore } from 'entities/hooks/useStores'
import { specCaptions } from './consts'
import { getSpecLines, getVisibleLines } from './model'
import styles from './styles.module.scss'

export const Spec = observer((): JSX.Element => {
  const [openComponents, setOpenComponents] = useState<Record<string, boolean>>({})
  const productStore = useProductStore()
  const { getDictionary } = productStore
  const calculationStore = useCalculationStore()
  const { calcResult } = calculationStore
  const specLines = useMemo(() => {
    setOpenComponents({})
    return getSpecLines({ calcResult, getDictionary })
  }, [calcResult])
  const visibleLines = getVisibleLines(specLines, openComponents)
  return (
    <fieldset className={styles.spec}>
      <div className={styles.legend}>Спецификация</div>
      <div>
        <SpecLine specLineType={ESpecLineType.Caption} values={specCaptions} id='' parentId='' depth={0}/>
        {
          visibleLines.map((line, index) => (
            <SpecLine
              key={index}
              specLineType={line.specLineType}
              values={line.values}
              id={line.id}
              parentId={line.parentId}
              depth={line.depth}
              openComponents={openComponents}
              setOpenComponents={setOpenComponents}/>
          ))
        }
      </div>
    </fieldset>
  )
})
