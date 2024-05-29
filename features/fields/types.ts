/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface ISchemaField {
  checkType: ECheckType
  title?: string
  canBeEmpty?: boolean
}

interface IField extends ISchemaField {
  valid: boolean
  value: any
}

export interface ISchemaFields {
  [id: string]: ISchemaField
}

export interface IFields {
  [id: string]: IField
}

export interface IValues {
  [value: string]: any
}

export enum ECheckType {
  NoCheck,
  NotNull,
  Email,
  PasswordOrEmpty,
  PhoneOrEmpty,
  KppOrEmpty,
  OkpoOrEmpty,
  BikOrEmpty,
  Cyrrilic,
  ExternCheck
}
