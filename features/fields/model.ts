import { isBikValid, isCyrrilic, isEmailValid } from 'shared/utils/validators/common/valid'
import { isPasswordValid, isPhoneValid, isKppValid } from 'shared/utils/validators'
import { ECheckType, type IValues, type IFields, type ISchemaFields } from './types'
import { isOkpoValid } from 'shared/utils/validators/okpo/okpo'

const isValid = (checkType: ECheckType, value: any, prevCheck?: boolean): boolean => {
  switch (checkType) {
    case ECheckType.NoCheck: return true
    case ECheckType.NotNull: return !!value
    case ECheckType.Email: return isEmailValid(value)
    case ECheckType.PasswordOrEmpty: return value === '' || isPasswordValid(value)
    case ECheckType.PhoneOrEmpty: return value === '' || isPhoneValid(value)
    case ECheckType.KppOrEmpty: return value === '' || isKppValid(value)
    case ECheckType.OkpoOrEmpty: return value === '' || isOkpoValid(value)
    case ECheckType.BikOrEmpty: return value === '' || isBikValid(value)
    case ECheckType.Cyrrilic: return isCyrrilic(value)
    case ECheckType.ExternCheck: return prevCheck ?? true
    default: return true
  }
}

export const initFields = (fields: ISchemaFields, values: IValues): IFields =>
  Object.entries(fields).reduce((acc, [key, field]) => ({
    ...acc,
    [key]: {
      ...field,
      value: values[key],
      valid: isValid(field.checkType, values[key])
    }
  }), {})

export const changeField = (fields: IFields, id: string, value: any): IFields => {
  const field = fields[id]
  field.value = value
  field.valid = isValid(field.checkType, value, field.valid)
  return { ...fields }
}

export const setFieldValid = (fields: IFields, id: string, valid: boolean): IFields => {
  const field = fields[id]
  field.valid = valid
  return { ...fields }
}

export const isAllValid = (fields: IFields): boolean =>
  Object.values(fields).reduce((acc, field) => acc && field.valid, true)

export const isSame = (fields: IFields, values: IValues): boolean =>
  Object.entries(values).reduce((acc, [key, value]) => acc && fields[key]?.value === value, true)

export const isAnyEmpty = (fields: IFields): boolean =>
  Object.values(fields).reduce((acc, field) => acc || !(field.value || field.canBeEmpty), false)

export const getValues = (fields: IFields): Record<string, any> =>
  Object.entries(fields).reduce((acc, [key, field]) => ({ ...acc, [key]: field.value }), {})
