import { checkDigit, checkDigitMod10 } from '../common/checkDigit'

export const isOkpoValid = (okpo: string): boolean => {
  if (!okpo?.length) return false
  if (/[^0-9]/.test(okpo)) return false
  if (okpo.length === 8) {
    let n8 = checkDigit(okpo, [1, 2, 3, 4, 5, 6, 7])
    if (n8 === 10) n8 = checkDigitMod10(okpo, [3, 4, 5, 6, 7, 8, 9])
    return (n8 === parseInt(okpo[7]))
  }
  if (okpo.length === 10) {
    let n10 = checkDigit(okpo, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    if (n10 === 10) n10 = checkDigitMod10(okpo, [3, 4, 5, 6, 7, 8, 9, 10, 1])
    return (n10 === parseInt(okpo[9]))
  }
  return false
}
