import { type IModel } from 'shared/api/renderModel/types'

export enum ERenderStatus {
  Empty, InProgress, Success, Fail, None
}

export interface IRenderModelRequest {
  data: {
    OK: boolean
    Error: string
    Result: IModel
  }
}
