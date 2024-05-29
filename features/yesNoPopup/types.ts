export interface IYesNoPopup {
  title: string
  message: string
  yesButtonTitle: string
  noButtonTitle: string
  disabled: boolean
  closeOnYes?: boolean
  closeHandler?: () => void
  yesHandler: () => void
  noHandler?: () => void
}
