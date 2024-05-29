import { observer } from 'mobx-react'
import { useCalculationStore } from 'entities/hooks/useStores'
import { getCalcResultStyle, getCalcTextStyle, getLegendStyle, getLegendTitle, getResultText } from './model'
import { ECalcStatus } from 'entities/stores/calculation/types'
import { type ICalcResult } from './types'

export const CalcResult = observer(({ isDemo }: ICalcResult): JSX.Element => {
  const calculationStore = useCalculationStore()
  const { calcStatus, calcResult, calcError } = calculationStore
  const visible = isDemo || calcStatus === ECalcStatus.Fail
  return visible
    ? (
      <fieldset className={getCalcResultStyle(calcStatus)}>
        <p className={getLegendStyle(calcStatus)}>{getLegendTitle(calcStatus)}</p>
        <div className={getCalcTextStyle(calcStatus)}>
          <p>{getResultText(calcStatus, calcResult?.Names.PrintName, calcError)}</p>
        </div>
      </fieldset>
      )
    : <></>
})
