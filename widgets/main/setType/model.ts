import { type ICheckRange, type IValidate } from './types'

export const validate = ({ selector, setSelectorValid, required }: IValidate): boolean => {
  return required.reduce((res, item) => {
    const isItemValid = selector[item].value !== undefined && selector[item].value !== '' && !Number.isNaN(selector[item].value)
    setSelectorValid(item, isItemValid)
    return res && isItemValid
  }, true)
}

export const checkRange = ({ selector, setSelectorValid, properties }: ICheckRange): boolean => {
  return Object.entries(properties).reduce((res, [item, value]) => {
    const isItemInRange =
      selector[item].value === undefined ||
      selector[item].value === '' ||
      ((value.maximum === undefined || (selector[item].value as number <= value.maximum)) &&
      (value.minimum === undefined || (selector[item].value as number >= value.minimum)))
    setSelectorValid(item, isItemInRange)
    return res && isItemInRange
  }, true)
}
