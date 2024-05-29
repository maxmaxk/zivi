export interface ICheckedTitledEdit {
  id: string
  title: string
  value: string
  isValid: boolean
  checked: boolean
  setValue: (id: string, value: string) => void
  setChecked: (checked: boolean) => void
}
