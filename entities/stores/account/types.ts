export interface IGetUserInfoResponse {
  data: {
    userName: string
    surname: string
    name: string
    secondName: string
    isBaseConfig: boolean
    email: string
    phone: string
    customerType: string
    customerRole: ECustomerRole
    counterparties: ICounterparty[]
  }
}

export interface ICounterparty {
  id: string
  companyName: string
  INN: string
  KPP: string
  OKPO: string
  lawAddress: string
  factAddress: string
  BIK: string
  bankName: string
  privateBankAccount: string
  corrBankAccount: string
  phone: string
  owner: boolean
}

export enum EAsyncStatus {
  Idle,
  Request,
  Success,
  Fail
}

export enum ECustomerRole {
  byer = 'buyer',
  manufactor = 'manufactor',
  provider = 'provider'
}

export interface IGetCounterpartyByINNResponse {
  data: {
    suggestions: ISuggestion[]
  }
}

export interface ISuggestion {
  data: {
    kpp: string
    name: {
      full_with_opf: string
    }
    okpo: string
    address: {
      value: string
    }
  }
}

export interface IGetBankByBIKResponse {
  data: {
    bankName: string
    corrAccount: string
  }
}

export interface ILocation {
  id: string
  name: string
}

export interface IGetLocationListResponse {
  data: ILocation[]
}
