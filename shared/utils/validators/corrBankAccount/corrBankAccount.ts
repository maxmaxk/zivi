import { isAccountValid } from '../common/accountValid'
import { isBikValid } from '../common/valid'
import { corrBankAccountRegexp } from './consts'

export const isCorrBankAccountValid = (paymentAccount: string, bik: string): boolean => {
  if (!corrBankAccountRegexp.test(paymentAccount)) return false
  if (!isBikValid(bik)) return false
  const checkValue = `0${bik.slice(4, 6)}${paymentAccount}`
  return isAccountValid(checkValue)
}
