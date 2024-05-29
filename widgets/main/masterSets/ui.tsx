import styles from './styles.module.scss'
import { SetType } from '../setType'
import { Draw } from '../draw'
import { SetParams } from '../setParams'
import { CalcResult } from '../calcResult'
import { PriceResult } from '../priceResult'
import { Spec } from '../spec'
import { Characters } from '../characters'
import { type IMasterSets } from './types'

export const MasterSets = ({ isDemo, closeHandler }: IMasterSets): JSX.Element => {
  return (
    <div className={styles.masterSets}>
      <SetType isDemo={isDemo} closeHandler={closeHandler}/>
      <Draw/>
      <SetParams/>
      <CalcResult isDemo={isDemo}/>
      {isDemo &&
        <>
          <PriceResult/>
          <Spec/>
          <Characters/>
        </>
      }
    </div>
  )
}
