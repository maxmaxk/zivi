import { type Dispatch, type SetStateAction } from 'react'

export interface ILoginInput {
  setLoginValid: Dispatch<SetStateAction<boolean>>
  setEmailValid?: Dispatch<SetStateAction<boolean>>
  setLogin: Dispatch<SetStateAction<string>>
  placeholder: string
  tooltip: JSX.Element
}

export interface IPasswordInput {
  disabled: boolean
  setPasswordValid: Dispatch<SetStateAction<boolean>>
  placeholder: string
  tooltip?: JSX.Element
  password?: string
  setPassword?: Dispatch<SetStateAction<string>>
}

export interface IEmailInput {
  setValid: Dispatch<SetStateAction<boolean>>
  setRegEmail?: Dispatch<SetStateAction<string>>
  email: string
}
