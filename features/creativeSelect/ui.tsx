import { type ISelectType } from 'entities/stores/types'
import { getPopupPosition, packPopupStyle } from 'features/popupStyles'
import { useEffect, useRef, useState } from 'react'
import Popup from 'reactjs-popup'
import styles from './styles.module.scss'
import { foundedPieces } from 'features/foundedPieces'
import { type ICreativeSelect } from './types'
import { type PopupPosition } from 'reactjs-popup/dist/types'

export const CreativeSelect = (props: ICreativeSelect): JSX.Element => {
  const { id, value, options, onMenuClose, onChange, onKeyDown } = props
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [dropDownState, setDropDownState] = useState<boolean>(false)
  const [selectItem, setSelectItem] = useState<number>(-1)
  const [enterValue, setEnterValue] = useState<string>(value)
  const [foundOptions, setFoundOptions] = useState<ISelectType[]>(options)
  const [popupPosition, setPopupPosition] = useState<PopupPosition>('bottom left')
  const [input, setInput] = useState<HTMLInputElement | null>(null)
  const ref = useRef(null)
  useEffect(() => {
    const position = getPopupPosition(id)
    if (position) {
      setPopupPosition(position)
    }
  })
  useEffect(() => {
    setFoundOptions(options)
  }, [options])
  useEffect(() => {
    setInput(ref.current as unknown as HTMLInputElement)
  }, [ref.current])
  const inputFocusHandler = (_e: React.MouseEvent<HTMLInputElement>): void => {
    setFoundOptions(options)
    setOpenPopup(true)
  }
  const valueInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setEnterValue(value)
    if (value === '') {
      setFoundOptions(options)
    } else {
      setFoundOptions(
        options.filter(option => option.label.includes(value))
      )
    }
    setOpenPopup(true)
    setSelectItem(-1)
  }

  const chooseItemHandler = (e: React.MouseEvent<HTMLElement>): void => {
    let el: HTMLElement | null = e.target as HTMLLIElement
    if (el) {
      if (el.tagName === 'SPAN') {
        el = el.parentElement
      }
      if (el) {
        setEnterValue(el.id)
        onChange({ value: el.id })
      }
    }
    const taElement = document.querySelector(`#${id}`)
    if (taElement) (taElement as HTMLElement).focus()
    setOpenPopup(false)
    onMenuClose()
  }
  const setSelectItemHandler = (itemNo: number): void => {
    setSelectItem(itemNo)
    const optionId = options[itemNo]?.value
    if (optionId) {
      const liElem = document.getElementById(optionId)
      if (liElem) {
        liElem.scrollIntoView()
      }
    }
  }
  const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (openPopup) {
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) e.preventDefault()
      if (e.key === 'ArrowDown') setSelectItemHandler(Math.min(selectItem + 1, foundOptions.length - 1))
      if (e.key === 'ArrowUp') setSelectItemHandler(Math.max(selectItem - 1, 0))
      if (e.key === 'Enter') {
        if (options?.[selectItem]) {
          setEnterValue(foundOptions[selectItem].label)
        }
        onChange({ value: enterValue })
        setOpenPopup(false)
        onMenuClose()
      }
    }
    if (e.key === 'Escape') {
      inputBlurHandler()
    }
    if (e.key === 'Tab') {
      setOpenPopup(false)
      onMenuClose()
      if (onKeyDown) onKeyDown(e)
    }
  }
  const addOption = (): void => {
    onChange({ value: enterValue })
    setOpenPopup(false)
    onMenuClose()
  }
  const inputBlurHandler = (): void => {
    setTimeout(() => {
      onMenuClose()
    }, 100)
  }
  const onOpenHanlder = (): void => {
    setDropDownState(true)
  }
  const onCloseHandler = (): void => {
    setDropDownState(false)
    setOpenPopup(false)
  }
  return (
    <Popup
      trigger={ _ => (
        <div className={styles.inputContainer}>
          <input
            autoFocus
            type='text'
            id={id}
            ref={ref}
            className={styles.selectInput}
            autoComplete='off'
            value={enterValue}
            onChange={valueInputHandler}
            onClick={inputFocusHandler}
            onBlur={inputBlurHandler}
            onKeyDown={inputKeyDownHandler}>
          </input>
          <div className={`${styles.dropdown as string} ${dropDownState ? styles.open as string : styles.close as string}`}></div>
        </div>
      )}
      position={popupPosition}
      open={openPopup}
      on='click'
      closeOnDocumentClick
      onOpen={onOpenHanlder}
      onClose={onCloseHandler}
      arrow={false}
      contentStyle={packPopupStyle}>
      <div className={styles.optionsContainer} style={{ width: input?.clientWidth ? `${input.clientWidth - 10}px` : 'auto' }}>
        {options.length > 0 &&
          <ul className={styles.options}>
            {foundOptions.map((option, index) => (
              <li
                key={option.value}
                id={option.value}
                className={`${styles.option as string} ${index === selectItem ? styles.selectItem as string : ''}`}
                onClick={chooseItemHandler}>
                  {foundedPieces(option.label, enterValue)}
              </li>
            ))}
            {
              (foundOptions.length === 0) && (enterValue !== '') &&
                <div className={styles.add} onClick={addOption}>Добавить: {enterValue}</div>
            }
          </ul>
        }
      </div>
    </Popup>
  )
}
