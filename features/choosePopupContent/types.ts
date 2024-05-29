import { type ISelectType } from 'entities/stores/types'

export interface IChoosePopupContent {
  title: string
  options?: ISelectType[]
  value: string
  chooseContentType: EChooseContentType
  setValue: (value: string) => void
  execHandler: () => void
  cancelHandler: () => void
}

export enum EChooseContentType {
  Select, Textarea
}
