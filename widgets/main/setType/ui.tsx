import { observer } from 'mobx-react'
import { useCallback, useEffect, useState } from 'react'
import { useCalculationStore, useOrderCardStore, useProductStore, useRenderStore } from 'entities/hooks/useStores'
import { TitledSelect } from 'features/titledSelect'
import { TitledCheckbox } from 'features/titledCheckbox'
import { Button } from 'features/button'
import { checkRange, validate } from './model'
import { Notifications } from 'entities/stores/common/notifications/notifications'
import { ECalcStatus } from 'entities/stores/calculation/types'
import styles from './styles.module.scss'
import { type ISetType } from './types'
import { flowResult } from 'mobx'
import { PopupMessage } from 'features/popupMessage'

export const SetType = observer(({ isDemo, closeHandler }: ISetType): JSX.Element => {
  const [messageText, setMessageText] = useState<string>('')
  const [openmessage, setOpenMessage] = useState<boolean>(false)
  const productStore = useProductStore()
  const orderCardStore = useOrderCardStore()
  const { sortByType, setSort, currentProduct, productSchema, selector, setSelectorValid, isLoading } = productStore
  const calculationStore = useCalculationStore()
  const renderStore = useRenderStore()
  const { clearProductCalculation, calcStatus } = calculationStore
  const hideLetters = window.location.pathname === '/hide-letters'
  const notifications = new Notifications()

  const keyDownHandler = (ev: KeyboardEvent): void => {
    if ((ev.code === 'Enter') && ev.ctrlKey && (calcStatus !== ECalcStatus.InProgress) && !isLoading) calcProductHandler()
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [productSchema, currentProduct, calcStatus, isLoading])

  useEffect(() => {
    const hideLetters = window.location.pathname === '/hide-letters'
    renderStore.renderModel(productStore, hideLetters)
  }, [currentProduct])

  const productChangeHandler = useCallback((_id: string, productId: string): void => {
    productStore.setCurrentProduct(productId)
    clearProductCalculation()
  }, [])

  const calcProductHandler = useCallback((e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.preventDefault()
    if (!productSchema[currentProduct]?.input_schema?.required) {
      notifications.errorNotification({ title: 'Нет схемы расчета' })
      return
    }
    const isValid = validate({
      selector,
      setSelectorValid,
      required: productSchema[currentProduct].input_schema.required
    })
    if (!isValid) {
      setMessageText('Не заполнены обязательные поля')
      setOpenMessage(true)
      return
    }
    const rangeValid = checkRange({
      selector,
      setSelectorValid,
      properties: productSchema[currentProduct].input_schema.properties
    })
    if (!rangeValid) {
      setMessageText('Значения некоторых полей вне допустимого диапазона')
      setOpenMessage(true)
      return
    }
    void flowResult(calculationStore.makeProductCalculation(productStore, isDemo))
      .then((positionId) => {
        if (!isDemo) {
          if (positionId) orderCardStore.addPositionFromMaster(positionId)
          if (closeHandler && positionId) closeHandler()
        } else {
          productStore.correctProdustArgs(calculationStore.calcResult?.Args)
          renderStore.renderModel(productStore, hideLetters)
        }
      })
  }, [productSchema, currentProduct])

  return (
    <fieldset className={styles.setType}>
      <TitledSelect
        id="productSelect"
        labelTitle='Тип изделия'
        options={productStore.types}
        area={1}
        labelSize={14}
        value={currentProduct}
        isValid={true}
        disabled={calcStatus === ECalcStatus.InProgress || isLoading}
        placeHolder='Загрузка...'
        valueChangeHandler={productChangeHandler}/>
      <TitledCheckbox
        title='сортировка по сечению'
        area={2}
        value={sortByType}
        disabled={calcStatus === ECalcStatus.InProgress || isLoading}
        setValue={setSort}/>
      <Button
        title={isDemo ? 'Рассчитать изделие' : 'Рассчитать и добавить'}
        area={3}
        styleName='masterCalcButton'
        disabled={calcStatus === ECalcStatus.InProgress || isLoading}
        comment='Расчет изделия: Ctrl + Enter'
        onClickHandler={calcProductHandler}/>
      <PopupMessage
        messageType='fail'
        messageText={messageText}
        open={openmessage}
        setOpen={setOpenMessage}
      />
    </fieldset>
  )
})
