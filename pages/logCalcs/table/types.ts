export interface ILogRow {
  id: string
  num: number
  date:	string
  name:	string
  application: string
  packId:	string
  hash:	string
}

export interface ILogProps {
  data: ILogRow[]
}
