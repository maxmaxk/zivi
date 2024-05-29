export interface IHistoryResponse {
  data: IHistory[]
}

export interface IHistory {
  id: string
  date: string
  name: string
  user: string
}
