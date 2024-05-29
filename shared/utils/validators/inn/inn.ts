import { checkDigitMod10 } from '../common/checkDigit'

export const isInnValid = (inn: string, isPrivate: boolean): boolean => {
  if (!inn?.length) return false
  if (/[^0-9]/.test(inn)) return false
  if ((isPrivate && inn.length !== 12) || (!isPrivate && inn.length !== 10)) return false
  if (inn.length === 10) {
    const n10 = checkDigitMod10(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8])
    return (n10 === parseInt(inn[9]))
  }
  if (inn.length === 12) {
    const n11 = checkDigitMod10(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
    const n12 = checkDigitMod10(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
    return ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11])))
  }
  return false
}
