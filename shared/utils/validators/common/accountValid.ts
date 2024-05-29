import { checkDigit } from './checkDigit'

const getAccountCheckArr = (): number[] => {
  const res = []
  for (let i = 0; i < 23; i++) {
    res.push([7, 1, 3][i % 3])
  }
  return res
}

export const isAccountValid = (checkValue: string): boolean => {
  const accountCheckArr = getAccountCheckArr()
  return checkDigit(checkValue, accountCheckArr, 10) === 0
}
