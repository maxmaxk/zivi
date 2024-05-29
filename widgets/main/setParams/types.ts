import { type IProductProperties } from 'entities/stores/product/types'

export enum EPart {
  Left, Right
}

export interface IRenderProperty {
  id: string
  isChild?: boolean
}

export interface IParentChildProperties {
  parents: IProductProperties
  childs: Record<string, string[]>
}
