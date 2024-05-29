import { action, flow, makeObservable, observable } from 'mobx'
import { EStyleType, type IData } from './types'

export class TableChecks {
  data: IData[]
  endOfData: boolean
  hasChanges: boolean
  hasFlags: boolean
  lastCheckIndex: number
  constructor () {
    this.data = []
    this.endOfData = true
    this.hasChanges = false
    this.hasFlags = false
    this.lastCheckIndex = 0
    makeObservable(this, {
      hasChanges: observable,
      hasFlags: observable,
      toggle: action.bound,
      setAll: action.bound,
      setValue: action.bound,
      clearEdited: action.bound,
      shiftClick: action.bound,
      loadMore: flow
    })
  }

  * loadMore (): Generator {
    yield undefined
  }

  checkFlags (): void {
    this.hasFlags = this.data.some(item => item.styleType.has(EStyleType.Checked))
  }

  clearChecks (): void {
    this.data.forEach(item => item.styleType.delete(EStyleType.Checked))
    this.hasFlags = false
  }

  clearEdited (): void {
    this.data.forEach(item => item.styleType.delete(EStyleType.Edited))
    this.hasChanges = false
  }

  toggle (id: string): void {
    const index = this.data.findIndex(item => item.id === id)
    if (index >= 0) {
      this.lastCheckIndex = index
      const item = this.data[index]
      if (item.styleType.has(EStyleType.Checked)) {
        item.styleType.delete(EStyleType.Checked)
      } else {
        item.styleType.add(EStyleType.Checked)
      }
      this.checkFlags()
    }
  }

  setByIndex (index: number, value: boolean): void {
    this.lastCheckIndex = index
    const item = this.data[index]
    if (item.styleType.has(EStyleType.Normal) || item.styleType.has(EStyleType.Unactual)) {
      if (value) {
        item.styleType.add(EStyleType.Checked)
      } else {
        item.styleType.delete(EStyleType.Checked)
      }
    }
  }

  setAll (set: boolean): void {
    if (set) {
      this.data.filter(
        data => data.styleType.has(EStyleType.Unactual) || data.styleType.has(EStyleType.Normal)
      ).forEach(item => item.styleType.add(EStyleType.Checked))
      this.checkFlags()
    } else {
      this.clearChecks()
    }
  }

  setValue (id: string, field: string, newValue: string): void {
    const item = this.data.find(item => item.id === id)
    const newValueFloat = parseFloat(newValue).toFixed(2)
    if (!item) return
    const fieldItem = item.values[field]
    if (!fieldItem) return
    if (fieldItem.value === newValueFloat) return
    item.styleType.add(EStyleType.Edited)
    fieldItem.value = newValueFloat
    this.hasChanges = true
  }

  shiftClick (id: string): void {
    const index = this.data.findIndex(item => item.id === id)
    if (index >= 0) {
      const item = this.data[index]
      const value = item?.styleType.has(EStyleType.Checked)
      TableChecks.shiftHandler(index, this.lastCheckIndex, value, this.setByIndex.bind(this), this.checkFlags.bind(this))
    }
  }

  static shiftHandler (
    index: number,
    lastCheckIndex: number,
    value: boolean,
    setByIndex: (index: number, value: boolean) => void,
    checkFlags: () => void
  ): void {
    if (index !== lastCheckIndex) {
      const startIndex = Math.min(index, lastCheckIndex) + Number(index < lastCheckIndex)
      const endIndex = Math.max(index, lastCheckIndex) - Number(index > lastCheckIndex)
      for (let i = startIndex; i <= endIndex; i++) {
        setByIndex(i, !value)
      }
      checkFlags()
    }
  }
}
