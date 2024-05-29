import styles from './styles.module.scss'
import { SectorCaption } from 'features/sectorCaption'
import { Button } from 'features/button'
import { type IYesNoPopup } from './types'
import { observer } from 'mobx-react'

export const YesNoPopup = observer((props: IYesNoPopup): JSX.Element => {
  const { title, message, yesButtonTitle, noButtonTitle, disabled, closeOnYes, closeHandler, yesHandler, noHandler } = props
  const yesButtonHandler = (): void => {
    yesHandler()
    if (closeHandler && closeOnYes !== false) closeHandler()
  }
  const noButtonHandler = (): void => {
    if (noHandler) noHandler()
    if (closeHandler) closeHandler()
  }
  return (
    <div className={styles.popupContainer}>
      <SectorCaption title={title} area={1} captionStyle='popupCaption'/>
      <div className={styles.confirm}>{message}</div>
      <div className={styles.controls}>
        <Button onClickHandler={yesButtonHandler} disabled={disabled} title={yesButtonTitle} styleName='calcButton'/>
        <Button onClickHandler={noButtonHandler} disabled={disabled} title={noButtonTitle} styleName='calcButton'/>
      </div>
    </div>
  )
})
