import { makeObservable, observable, action } from 'mobx'

export class RootStore {
  waiting: boolean

  constructor () {
    this.waiting = false
    makeObservable(this, {
      waiting: observable,
      setWaiting: action.bound
    })
  }

  setWaiting (waiting: boolean): void {
    this.waiting = waiting
  }
}
