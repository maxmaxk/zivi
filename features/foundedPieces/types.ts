export enum ETextStyle {
  Normal, HighLight
}

interface IOptionLabelPart {
  text: string
  textStyle: ETextStyle
}

export type IOptionLabel = IOptionLabelPart[]
