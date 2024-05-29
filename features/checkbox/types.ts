export interface ICheckbox {
  id?: string
  value: boolean
  area?: number
  disabled?: boolean
  theme?: 'black' | 'orange'
  setValue: (value: boolean) => void
  shiftClick?: () => void
}
