export const checkDigit = (value: string, coefficients: number[], division: number = 11): number => {
  const n = coefficients.reduce((acc, coef, i) => acc + coef * parseInt(value[i]), 0)
  return n % division
}

export const checkDigitMod10 = (value: string, coefficients: number[]): number => {
  return checkDigit(value, coefficients) % 10
}
