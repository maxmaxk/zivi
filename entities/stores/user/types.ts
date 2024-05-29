export interface ITokenResponse {
  data: {
    token: string
    refreshTokenExpiration: string
  }
}

export interface IAuthResponse extends ITokenResponse {}

export interface IChangePasswordResponse extends ITokenResponse {}

export interface IMakeRegistrationResponse extends ITokenResponse {}

export interface IGetRegistrationEmailResponse {
  data: {
    email: string
    userName: string
  }
}

export interface IGetRegistrationResponse {
  data: {
    email: string
    id: string
  }
}

export interface IGetUserResponse {
  data: {
    userName: string
  }
}

export enum ELoginStatus {
  Guest,
  Logining,
  Logined,
  RegisterConfirm,
  RecoveryPasswordConfirm
}
