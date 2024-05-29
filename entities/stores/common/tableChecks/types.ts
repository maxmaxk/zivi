export interface IData {
  id: string
  styleType: Set<EStyleType>
  values: Record<string, IValue>
}

export enum EStyleType {
  Normal,
  Actual,
  Unactual,
  Checked,
  Edited,
  Recalculated
}

export interface IValue {
  value: string
  title?: string
  url?: string
  align?: 'left' | 'middle'
}
