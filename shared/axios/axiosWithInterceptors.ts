import axios from 'axios'
import { action, runInAction } from 'mobx'

export const axiosWithInterceptors = (setWaiting: (waiting: boolean) => void): void => {
  let requestCount = 0
  let resetTimer: NodeJS.Timeout | null = null
  const resetTimeOut = 600000

  const reset = (): void => {
    requestCount = 0
    action(() => { setWaiting(false) })
  }

  const killTimer = (): void => {
    if (resetTimer !== null) {
      clearTimeout(resetTimer)
      resetTimer = null
    }
  }

  const stop = (): void => {
    requestCount--
    if (requestCount <= 0) {
      requestCount = 0
      killTimer()
      runInAction(() => { setWaiting(false) })
    }
  }

  const start = (): void => {
    runInAction(() => { setWaiting(true) })
    killTimer()
    resetTimer = setTimeout(reset, resetTimeOut)
  }

  axios.interceptors.request.use((config) => {
    if (requestCount === 0) start()
    requestCount++
    return config
  },
  async (error) => {
    reset()
    return await Promise.reject(error)
  })

  axios.interceptors.response.use((response) => {
    stop()
    return response
  },
  async (error) => {
    stop()
    return await Promise.reject(error)
  })
}
