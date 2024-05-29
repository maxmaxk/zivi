import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const defaultDebounceDelay = 300
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay ?? defaultDebounceDelay)
      return () => {
        clearTimeout(handler)
      }
    },
    [value]
  )
  return debouncedValue
}
