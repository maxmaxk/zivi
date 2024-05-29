import { type ICalcResult, type IMaterial } from 'entities/stores/calculation/types'
import { type ISpecLine } from 'features/specLine'

export interface IGetSpecLines {
  calcResult: ICalcResult | null
  getDictionary: <T>(dictionaryName: string) => T
  iterRes?: ISpecLine[]
  parentId?: string
  depth?: number
}

export interface IAddMaterial {
  material: IMaterial
  getDictionary: <T>(dictionaryName: string) => T
  iterRes: ISpecLine[]
  id: string
  parentId: string
  depth: number
}

export interface IAddComponent {
  component: ICalcResult
  iterRes: ISpecLine[]
  id: string
  parentId: string
  depth: number
}

export interface IMaterialType {
  Type: string
}

export interface IMaterialUnit {
  Unit: string
}

export interface IHumanUnit {
  Symbol: string
}
