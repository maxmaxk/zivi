export interface IValidInput {
  id: string
  value: string
  type: string
  isValid: boolean
  disabled?: boolean
  placeholder?: string
  width?: number
  setValue?: (id: string, value: string) => void
}
