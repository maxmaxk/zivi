import { ERenderStatus } from 'entities/stores/render/types'
import { type IInfoMessage } from './types'
import styles from './styles.module.scss'
import { ECalcStatus, type ICalcResult } from 'entities/stores/calculation/types'
import { fileRegexp } from './consts'

const getInfoMessage = (renderStatus: ERenderStatus): JSX.Element => {
  switch (renderStatus) {
    case ERenderStatus.Empty: return <></>
    case ERenderStatus.InProgress: return <div className={styles.noModel}>Выполняется расчет модели</div>
    case ERenderStatus.None: return <div className={styles.noModel}>3D-модель изделия находится в разработке</div>
    case ERenderStatus.Fail: return <div className={styles.noModel}>Ошибка при расчете модели</div>
    default: return <></>
  }
}

export const InfoMessage = ({ renderStatus }: IInfoMessage): JSX.Element => {
  return (
    <div className={styles.messageContainer}>
      {getInfoMessage(renderStatus)}
    </div>
  )
}

const covertToFileName = (calcName: string): string => {
  return calcName.replace(fileRegexp, '_')
}

export const getFileName = (calcStatus: ECalcStatus, calcResult: ICalcResult | null): string => {
  const calcName = calcResult?.Names.PrintName
  if (!calcResult || calcStatus !== ECalcStatus.Success || !calcName) return 'image.png'
  return covertToFileName(calcName)
}
