export type TParentType = 'input' | 'div' | 'checkbox' | 'table' | 'form'

export interface ITooltip {
  tooltipContent: JSX.Element | undefined
  parentType?: TParentType
  contentSide?: 'onLeft' | 'onRight'
}
