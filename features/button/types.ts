export interface IButton {
  title: string
  area?: number
  styleName: string
  disabled?: boolean
  comment?: string
  onClickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
