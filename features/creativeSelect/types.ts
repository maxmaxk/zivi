import type { ISelectType } from 'entities/stores/types'

export interface ICreativeSelect {
  id: string
  value: string
  options: ISelectType[]
  onMenuClose: () => void
  onChange: (newValue: unknown) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void
}
