import { bikRegexp, cyrrilicRegexp, emailRegexp, kppRegexp, loginRegexp, passwordRegexp, phoneRegexp } from './consts'

export const isEmailValid = (email: string): boolean => emailRegexp.test(email)
export const isLoginValid = (login: string): boolean => loginRegexp.test(login)
export const isPasswordValid = (password: string): boolean => passwordRegexp.test(password)
export const isPhoneValid = (phone: string): boolean => phoneRegexp.test(phone)
export const isKppValid = (kpp: string): boolean => kppRegexp.test(kpp)
export const isBikValid = (bik: string): boolean => bikRegexp.test(bik)
export const isCyrrilic = (name: string): boolean => cyrrilicRegexp.test(name)
