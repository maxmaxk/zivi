import { Notifications } from 'entities/stores/common/notifications'
import { makeAutoObservable, flow, action } from 'mobx'
import { authRequest } from 'shared/api/auth'
import { getRegistrationRequest } from 'shared/api/getRegistration'
import { getRegistrationEmailRequest } from 'shared/api/getRegistrationEmail'
import {
  ELoginStatus,
  type IGetRegistrationEmailResponse,
  type IAuthResponse,
  type IGetRegistrationResponse,
  type IGetUserResponse,
  type IChangePasswordResponse,
  type IMakeRegistrationResponse,
  type ITokenResponse
} from './types'
import { type ELawStatus, makeRegistrationRequest } from 'shared/api/makeRegistration'
import { type AxiosError } from 'axios'
import { getMessage } from 'shared/axios/messages'
import { getUserRequest } from 'shared/api/getUser'
import { initRecoveryPasswordRequest } from 'shared/api/initResetPassword'
import { changePasswordRequest } from 'shared/api/changePassword'
import moment from 'moment'

export class UserStore {
  userName: string
  regId: string
  recoveryId: string
  loginStatus: ELoginStatus
  email: string
  startReg: boolean
  startRecoveryPassword: boolean
  isLoading: boolean
  notifications: Notifications

  constructor () {
    this.userName = ''
    this.regId = ''
    this.recoveryId = ''
    this.loginStatus = localStorage.getItem('token') ? ELoginStatus.Logining : ELoginStatus.Guest
    this.email = ''
    this.startReg = false
    this.startRecoveryPassword = false
    this.isLoading = false
    this.notifications = new Notifications()
    makeAutoObservable(this, {
      auth: flow,
      getUser: flow,
      getRegistration: flow,
      initRecoveryPassword: flow,
      changePassword: flow,
      resetLoginStatus: action.bound,
      setRegisterConfirmStatus: action.bound,
      resetStartReg: action.bound,
      resetStartRecoveryPassword: action.bound,
      logout: action.bound
    })
  }

  * auth (login: string, password: string): Generator {
    this.userName = ''
    try {
      const authResponse = (yield authRequest(login, password)) as IAuthResponse
      const { token } = authResponse.data
      if (token) {
        this.setUser(authResponse, login)
      }
      return true
    } catch (error: unknown) {
      if ((error as AxiosError).response?.data === 'Указан неверный логин или пароль!') {
        return false
      } else {
        this.notifications.errorNotification(getMessage(error as AxiosError, 'auth request error'))
        return true
      }
    }
  }

  isExpPeriodDone (expPeriod: string | null): boolean {
    if (!expPeriod) return true
    return moment(expPeriod).isBefore()
  }

  * getUser (): Generator {
    const token = localStorage.getItem('token')
    const expPeriod = localStorage.getItem('expPeriod')
    if (!token) {
      this.loginStatus = ELoginStatus.Guest
      return
    }
    if (this.isExpPeriodDone(expPeriod)) {
      this.loginStatus = ELoginStatus.Guest
      localStorage.removeItem('token')
      localStorage.removeItem('expPeriod')
      return
    }
    this.loginStatus = ELoginStatus.Logining
    try {
      const getUserResponse = (yield getUserRequest()) as IGetUserResponse
      this.userName = getUserResponse.data.userName
      this.loginStatus = ELoginStatus.Logined
    } catch (error: unknown) {
      this.loginStatus = ELoginStatus.Guest
    }
  }

  * getRegistration (email: string): Generator {
    try {
      this.isLoading = true
      const getRegistrationResponse = (yield getRegistrationRequest(email)) as IGetRegistrationResponse
      this.isLoading = false
      if (getRegistrationResponse.data.email) this.setStartReg()
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getRegistration request error'))
    }
  }

  * getRegistrationEmail (id: string): Generator {
    try {
      this.regId = ''
      this.recoveryId = ''
      const getRegistrationEmailResponse = (yield getRegistrationEmailRequest(id)) as IGetRegistrationEmailResponse
      const data = getRegistrationEmailResponse.data
      const { email, userName } = data
      if (!email) throw new Error('Id not found')
      this.email = email
      this.userName = userName
      if (userName) {
        this.setRecoveryPasswordStatus()
        this.recoveryId = id
      } else {
        this.setRegisterConfirmStatus()
        this.regId = id
      }
      return true
    } catch (error: unknown) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getRegistrationEmail request error'))
      return false
    }
  }

  * makeRegistration (login: string, password: string, customerType: ELawStatus): Generator {
    try {
      const makeRegistrationResponse = (
        yield makeRegistrationRequest({ id: this.regId, login, password, customerType })) as IMakeRegistrationResponse
      const { token } = makeRegistrationResponse.data
      this.setUser(makeRegistrationResponse, login)
      return token
    } catch (error: unknown) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'makeRegistration request error'))
    }
  }

  * initRecoveryPassword (userNameOrEmail: string, isEmail: boolean): Generator {
    try {
      const userName = isEmail ? undefined : userNameOrEmail
      const email = isEmail ? userNameOrEmail : undefined
      yield initRecoveryPasswordRequest({ email, userName })
      this.startRecoveryPassword = true
    } catch (error: unknown) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'initResetPassword request error'))
    }
  }

  * changePassword (password: string): Generator {
    try {
      const changePasswordResponse = (yield changePasswordRequest({ id: this.recoveryId, password })) as IChangePasswordResponse
      const { token } = changePasswordResponse.data
      this.setUser(changePasswordResponse)
      return token
    } catch (error: unknown) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'changePassword request error'))
    }
  }

  setUser (tokenResponse: ITokenResponse, login?: string): void {
    const { token, refreshTokenExpiration } = tokenResponse.data
    if (!token) throw new Error('Wrong token')
    if (!refreshTokenExpiration) throw new Error('Wrong token expiration date')
    if (login) this.userName = login
    this.loginStatus = ELoginStatus.Logined
    localStorage.setItem('token', token)
    localStorage.setItem('expPeriod', refreshTokenExpiration)
  }

  resetLoginStatus (): void {
    this.loginStatus = ELoginStatus.Guest
  }

  setStartReg (): void {
    this.startReg = true
  }

  resetStartReg (): void {
    this.startReg = false
  }

  resetStartRecoveryPassword (): void {
    this.startRecoveryPassword = false
    this.recoveryId = ''
  }

  setRegisterConfirmStatus (): void {
    this.loginStatus = ELoginStatus.RegisterConfirm
  }

  setRecoveryPasswordStatus (): void {
    this.loginStatus = ELoginStatus.RecoveryPasswordConfirm
  }

  logout (): void {
    this.loginStatus = ELoginStatus.Guest
    this.userName = ''
    localStorage.removeItem('token')
  }
}
