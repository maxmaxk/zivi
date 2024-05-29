import { makeAutoObservable, flow, action } from 'mobx'
import { Notifications } from 'entities/stores/common/notifications'
import { type ProductStore } from '../product/productStore'
import { ERenderStatus, type IRenderModelRequest } from './types'
import { serviceErrorText } from './consts'
import { type IModel, renderModelRequest, ELigthType } from 'shared/api/renderModel'

export class RenderStore {
  model: IModel
  renderStatus: ERenderStatus
  renderError: string
  notifications: Notifications
  constructor () {
    this.model = {
      shapes: '',
      verges: '',
      sizes: '',
      outBox: '',
      lightType: ELigthType.Light1
    }
    this.renderStatus = ERenderStatus.Empty
    this.renderError = ''
    this.notifications = new Notifications()
    makeAutoObservable(this, {
      renderModel: flow,
      clearModel: action.bound,
      reopenModel: action.bound
    })
  }

  * renderModel (productStore: ProductStore, hideLetters: boolean = false): Generator {
    const { currentProduct, getSelectorJson } = productStore
    const selectorJson = getSelectorJson.call(productStore)
    selectorJson.hideLetters = hideLetters
    this.renderStatus = ERenderStatus.InProgress
    try {
      const productCalculationResponse =
        (yield renderModelRequest(currentProduct, selectorJson)) as IRenderModelRequest
      if (!productCalculationResponse.data.OK) {
        this.renderStatus = ERenderStatus.Fail
        this.renderError = productCalculationResponse.data.Error
        this.notifications.errorNotification({ title: serviceErrorText })
        return Promise.reject
      }
      this.model = productCalculationResponse.data.Result
      this.renderStatus = this.model.shapes !== '' ? ERenderStatus.Success : ERenderStatus.None
    } catch (error: any) {
      this.renderStatus = ERenderStatus.Fail
      if (error.response) {
        this.renderError = error.response.data?.Error
      }
      this.notifications.errorNotification({ title: error.message ?? error })
    }
  }

  clearModel (): void {
    this.model = {
      shapes: '',
      verges: '',
      sizes: '',
      outBox: '',
      lightType: ELigthType.Light1
    }
    this.renderStatus = ERenderStatus.Empty
  }

  reopenModel (): void {
    if (this.renderStatus !== ERenderStatus.Success) return
    this.renderStatus = ERenderStatus.InProgress
    setTimeout(() => {
      this.renderStatus = ERenderStatus.Success
    }, 100)
  }
}
