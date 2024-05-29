import { SectorCaption } from 'features/sectorCaption'
import { Button } from 'features/button'
import { EChooseContentType, type IChoosePopupContent } from './types'
import styles from './styles.module.scss'
import { ReactSelect } from 'features/reactSelect'

export const ChoosePopupContent = (props: IChoosePopupContent): JSX.Element => {
  const { title, options, value, chooseContentType, setValue, execHandler, cancelHandler } = props
  const selectChangeHandler = (_id: string, value: string): void => {
    setValue(value)
  }
  const valueChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.popupContainer}>
      <SectorCaption title={title} area={1} captionStyle='popupCaption'/>
      <div className={styles.selectContainer}>
        {chooseContentType === EChooseContentType.Select &&
          <ReactSelect
            id=''
            options={options ?? []}
            isValid={true}
            value={value}
            valueChangeHandler={selectChangeHandler}
          />
        }
        {chooseContentType === EChooseContentType.Textarea &&
          <textarea
            className={styles.textarea}
            value={value}
            onChange={valueChangeHandler}
          />
        }
      </div>
      <div className={styles.controls}>
        <Button onClickHandler={execHandler} disabled={!value} title='Сохранить' styleName='calcButton'/>
        <Button onClickHandler={cancelHandler} title='Отмена' styleName='calcButton'/>
      </div>
    </div>
  )
}
