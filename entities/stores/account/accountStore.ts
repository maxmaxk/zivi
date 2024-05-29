import { Notifications } from 'entities/stores/common/notifications'
import { makeAutoObservable, flow } from 'mobx'
import {
  ECustomerRole,
  EAsyncStatus,
  type IGetCounterpartyByINNResponse,
  type ICounterparty,
  type IGetUserInfoResponse,
  type IGetBankByBIKResponse,
  type IGetLocationListResponse,
  type ILocation
} from './types'
import { type AxiosError } from 'axios'
import { getMessage } from 'shared/axios/messages'
import { getUserInfoRequest } from 'shared/api/getUserInfo'
import { confirmNewMailRequest } from 'shared/api/confirmNewMail'
import { changeMailRequest } from 'shared/api/changeMail'
import { sendSmsRequest } from 'shared/api/sendSms'
import { confirmPhoneRequest } from 'shared/api/confirmPhone'
import { setUserFullnameRequest, type ISetUserFullnameRequest } from 'shared/api/setUserFullname'
import { setNewPasswordRequest, type ISetNewPasswordRequest } from 'shared/api/setNewPassword'
import { getCounterpartyByINNRequest } from 'shared/api/getCounterpartyByINN'
import { type IFields } from 'features/fields'
import { type TNewCounterparty, addCounterpartyRequest } from 'shared/api/addCounterparty'
import { type TEditCounterparty, editCounterpartyRequest } from 'shared/api/editCounterparty'
import { removeCounterpartyRequest } from 'shared/api/removeCounterparty'
import { getBankByBIKRequest } from 'shared/api/getBankByBIK'
import { changeToManufactorRequest } from 'shared/api/changeToManufactor'
import { getCityListRequest } from 'shared/api/getCityList'
import { getRegionListRequest } from 'shared/api/getRegionList'
import { type IChangToProviderRequest, changeToProviderRequest } from 'shared/api/changeToProvider'

export class AccountStore {
  email: string
  phone: string
  surname: string
  name: string
  secondName: string
  customerType: string
  customerRole: ECustomerRole
  isBaseConfig: boolean
  counterparties: ICounterparty[]
  city: ILocation[]
  regions: ILocation[]
  isLoading: boolean
  newMailConfirmStatus: EAsyncStatus
  changeMailStatus: EAsyncStatus
  newPhoneConfirmStatus: EAsyncStatus
  notifications: Notifications

  constructor () {
    this.email = ''
    this.phone = ''
    this.surname = ''
    this.name = ''
    this.secondName = ''
    this.customerRole = ECustomerRole.byer
    this.customerType = ''
    this.isBaseConfig = true
    this.counterparties = []
    this.city = []
    this.regions = []
    this.isLoading = false
    this.newMailConfirmStatus = EAsyncStatus.Idle
    this.changeMailStatus = EAsyncStatus.Idle
    this.newPhoneConfirmStatus = EAsyncStatus.Idle
    this.notifications = new Notifications()
    makeAutoObservable(this, {
      getUserInfo: flow,
      confirmNewMail: flow,
      changeMail: flow,
      getCounterpartyByINN: flow,
      changeToManufactor: flow,
      changeToProvider: flow,
      getCityList: flow,
      getRegionList: flow
    })
  }

  * getUserInfo (): Generator {
    try {
      this.isLoading = true
      const getUserInfoResponse = (yield getUserInfoRequest()) as IGetUserInfoResponse
      this.isLoading = false
      this.email = getUserInfoResponse.data.email
      this.phone = getUserInfoResponse.data.phone
      this.surname = getUserInfoResponse.data.surname
      this.name = getUserInfoResponse.data.name
      this.secondName = getUserInfoResponse.data.secondName
      this.customerRole = getUserInfoResponse.data.customerRole
      this.customerType = getUserInfoResponse.data.customerType
      this.isBaseConfig = getUserInfoResponse.data.isBaseConfig
      this.counterparties = getUserInfoResponse.data.counterparties
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getUserInfo request error'))
    }
  }

  * confirmNewMail (email: string): Generator {
    try {
      this.newMailConfirmStatus = EAsyncStatus.Request
      yield confirmNewMailRequest({ email })
      this.newMailConfirmStatus = EAsyncStatus.Success
    } catch (error: unknown) {
      this.newMailConfirmStatus = EAsyncStatus.Fail
      this.notifications.errorNotification(getMessage(error as AxiosError, 'confirmNewMail request error'))
    }
  }

  * changeMail (id: string): Generator {
    try {
      this.changeMailStatus = EAsyncStatus.Request
      yield changeMailRequest({ id })
      this.changeMailStatus = EAsyncStatus.Success
      return true
    } catch (error: unknown) {
      this.changeMailStatus = EAsyncStatus.Fail
      this.notifications.errorNotification(getMessage(error as AxiosError, 'changeMail request error'))
      return false
    }
  }

  * sendSms (phone: string): Generator {
    try {
      this.newPhoneConfirmStatus = EAsyncStatus.Request
      yield sendSmsRequest({ phone })
      this.newPhoneConfirmStatus = EAsyncStatus.Success
    } catch (error: unknown) {
      this.newPhoneConfirmStatus = EAsyncStatus.Fail
      this.notifications.errorNotification(getMessage(error as AxiosError, 'sendSms request error'))
    }
  }

  * confirmPhone (smsCode: string): Generator {
    try {
      yield confirmPhoneRequest({ smsCode })
      return true
    } catch (error: unknown) {
      this.notifications.errorNotification(getMessage(error as AxiosError, 'confirmPhone request error'))
      return false
    }
  }

  * setUserFullname (props: ISetUserFullnameRequest): Generator {
    try {
      this.isLoading = true
      yield setUserFullnameRequest(props)
      this.isLoading = false
      return true
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'setUserFullname request error'))
      return false
    }
  }

  * setNewPassword (props: ISetNewPasswordRequest): Generator {
    try {
      this.isLoading = true
      yield setNewPasswordRequest(props)
      this.isLoading = false
      return true
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'setNewPassword request error'))
      return false
    }
  }

  * getCounterpartyByINN (inn: string): Generator {
    try {
      this.isLoading = true
      const getCounterpartyByINNResponse = (yield getCounterpartyByINNRequest(inn)) as IGetCounterpartyByINNResponse
      this.isLoading = false
      return getCounterpartyByINNResponse.data.suggestions
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getCounterpartyByINN request error'))
      return null
    }
  }

  * addCounterparty (counterpartyFields: IFields): Generator {
    try {
      const counterparty: TNewCounterparty = {
        companyName: counterpartyFields.companyName.value,
        INN: counterpartyFields.INN.value,
        KPP: counterpartyFields.KPP.value,
        OKPO: counterpartyFields.OKPO.value,
        lawAddress: counterpartyFields.lawAddress.value,
        factAddress: counterpartyFields.factAddress.value,
        BIK: counterpartyFields.BIK.value,
        privateBankAccount: counterpartyFields.privateBankAccount.value,
        phone: counterpartyFields.phone.value,
        owner: false
      }
      this.isLoading = true
      yield addCounterpartyRequest(counterparty)
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'addCounterparty request error'))
      return null
    }
  }

  * editCounterparty (counterpartyFields: IFields, agentId: string): Generator {
    try {
      const counterparty: TEditCounterparty = {
        id: agentId,
        companyName: counterpartyFields.companyName.value,
        INN: counterpartyFields.INN.value,
        KPP: counterpartyFields.KPP.value,
        OKPO: counterpartyFields.OKPO.value,
        lawAddress: counterpartyFields.lawAddress.value,
        factAddress: counterpartyFields.factAddress.value,
        BIK: counterpartyFields.BIK.value,
        privateBankAccount: counterpartyFields.privateBankAccount.value,
        phone: counterpartyFields.phone.value,
        owner: counterpartyFields.owner.value
      }
      this.isLoading = true
      yield editCounterpartyRequest(counterparty)
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'editCounterparty request error'))
      return null
    }
  }

  * removeCounterparty (agentId: string): Generator {
    try {
      this.isLoading = true
      yield removeCounterpartyRequest(agentId)
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'removeCounterparty request error'))
      return null
    }
  }

  * getBankByBIK (bik: string): Generator {
    try {
      this.isLoading = true
      const getBankByBIKResponse = (yield getBankByBIKRequest(bik)) as IGetBankByBIKResponse
      this.isLoading = false
      return getBankByBIKResponse
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getBankByBIK request error'))
      return null
    }
  }

  * changeToManufactor (shortName: string): Generator {
    try {
      this.isLoading = true
      yield changeToManufactorRequest(shortName)
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'changeToManufactor request error'))
      return null
    }
  }

  * getCityList (search: string): Generator {
    try {
      this.isLoading = true
      const getCityListResponse = (yield getCityListRequest(search)) as IGetLocationListResponse
      this.city = getCityListResponse.data
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getCityList request error'))
      return null
    }
  }

  * getRegionList (): Generator {
    try {
      this.isLoading = true
      const getCityListResponse = (yield getRegionListRequest()) as IGetLocationListResponse
      this.regions = getCityListResponse.data
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'getRegionList request error'))
      return null
    }
  }

  * changeToProvider (props: IChangToProviderRequest): Generator {
    try {
      this.isLoading = true
      yield changeToProviderRequest(props)
      this.isLoading = false
    } catch (error: unknown) {
      this.isLoading = false
      this.notifications.errorNotification(getMessage(error as AxiosError, 'changeToProvider request error'))
      return null
    }
  }
}
