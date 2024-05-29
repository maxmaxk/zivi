import { isAccountValid } from '../common/accountValid'
import { isBikValid } from '../common/valid'
import { privateBankAccountRegexp } from './consts'

export const isPrivateBankAccountValid = (paymentAccount: string, bik: string): boolean => {
  if (!privateBankAccountRegexp.test(paymentAccount)) return false
  if (!isBikValid(bik)) return false
  const checkValue = `${bik.slice(6)}${paymentAccount}`
  return isAccountValid(checkValue)
}
