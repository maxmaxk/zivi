import { type IProductProperties, type ISelector } from 'entities/stores/product/types'

export interface IValidate {
  selector: ISelector
  setSelectorValid: (prop: string, valid: boolean) => void
  required: string[]
}

export interface ICheckRange {
  selector: ISelector
  setSelectorValid: (prop: string, valid: boolean) => void
  properties: IProductProperties
}

export interface ISetType {
  isDemo: boolean
  closeHandler: undefined | (() => void)
}
