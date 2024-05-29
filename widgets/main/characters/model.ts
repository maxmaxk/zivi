import { type ICalcResult } from 'entities/stores/calculation/types'

export const getCharacterValues = (calcResult: ICalcResult | null): string[] => {
  if (calcResult === null) {
    return ['', '']
  }
  const weight = calcResult?.Metrics?.Weight?.Value ?? 0
  const surfaceArea = calcResult?.Units?.SurfaceArea?.Value ?? 0
  return [weight, surfaceArea].map(item => item.toString())
}
