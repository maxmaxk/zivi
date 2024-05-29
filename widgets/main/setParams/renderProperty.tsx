import { type IProductProperty } from 'entities/stores/product/types'
import { type ISelectType } from 'entities/stores/types'
import styles from './styles.module.scss'
import { TitledSelect } from 'features/titledSelect'
import { TitledEdit } from 'features/titledEdit'
import { type IRenderProperty } from './types'
import { useCalculationStore, useProductStore, useRenderStore } from 'entities/hooks/useStores'
import { ECalcStatus } from 'entities/stores/calculation/types'
import { useCallback, useEffect, useState } from 'react'
import { flowResult } from 'mobx'
import { useDebounce } from 'entities/hooks/useDebounce'
import { checkRange } from '../setType/model'
import { observer } from 'mobx-react'

const getSelectOptions = (property: IProductProperty): ISelectType[] => {
  if (property.populateEnum !== undefined) {
    return property.populateEnum.map(enumItem => ({ value: enumItem.value, label: enumItem.label }))
  }
  if (property.enum !== undefined) {
    return property.enum.map(enumItem => ({ value: enumItem as string, label: enumItem as string }))
  }
  return []
}

const getTitle = (property: IProductProperty): string => {
  const { minimum, maximum, description, title } = property
  return (minimum === undefined || maximum === undefined)
    ? title
    : `${description ?? ''} (${minimum as unknown as string} - ${maximum as unknown as string})`
}

export const RenderProperty = observer(({ id, isChild }: IRenderProperty): JSX.Element => {
  const [editValue, setEditValue] = useState<[string, string] | null>(null)
  const calculationStore = useCalculationStore()
  const { clearProductCalculation, calcStatus } = calculationStore
  const productStore = useProductStore()
  const { selector, setSelectorValue, setSelectorValid, productProperties } = productStore
  const renderStore = useRenderStore()
  const property = productProperties[id]
  const options = getSelectOptions(property)
  const hideLetters = window.location.pathname === '/hide-letters'

  const propertyChangeHandler = useCallback((id: string, value: string): void => {
    setSelectorValue(id, value)
    void flowResult(renderStore.renderModel(productStore, hideLetters))
    clearProductCalculation()
  }, [])

  const deboucedPropertyHandler = (id: string, value: string): void => {
    setSelectorValue(id, value)
    setEditValue([id, value])
    clearProductCalculation()
  }

  const deboucedValue = useDebounce(editValue, 500)
  useEffect(() => {
    const rangeValid = checkRange({
      selector,
      setSelectorValid,
      properties: productProperties
    })
    if (deboucedValue !== null && rangeValid) {
      void flowResult(renderStore.renderModel(productStore, hideLetters))
    }
  }, [deboucedValue])

  const childPrefix = isChild ? '►' : ''

  return (
    <div key={id} className={styles.row}>
      {
        property.enum !== undefined
          ? <TitledSelect
            id={id}
            labelTitle={`${childPrefix}${property.title}`}
            options={options}
            value={selector[id]?.value as string}
            isValid={selector[id]?.valid}
            disabled={calcStatus === ECalcStatus.InProgress}
            valueChangeHandler={propertyChangeHandler}
          />
          : <TitledEdit
            id={id}
            title={`${childPrefix}${getTitle(property)}`}
            value={(selector[id]?.value ?? '') as string}
            limits={{ min: property.minimum, max: property.maximum }}
            isValid={selector[id]?.valid}
            disabled={calcStatus === ECalcStatus.InProgress}
            setValue={deboucedPropertyHandler}
          />
      }
    </div>
  )
})
