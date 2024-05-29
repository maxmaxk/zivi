import uuid from 'react-uuid'
import { ESpecLineType, type ISpecLine } from 'features/specLine'
import {
  type IMaterialType,
  type IAddComponent,
  type IAddMaterial,
  type IGetSpecLines,
  type IMaterialUnit,
  type IHumanUnit
} from './types'

export const getSpecLines = (props: IGetSpecLines): ISpecLine[] => {
  const { calcResult, getDictionary, iterRes = [], parentId = '', depth = 0 } = props
  if (calcResult === null) return iterRes
  calcResult?.Materials.forEach(material => {
    const id = uuid()
    addMaterial({ material, getDictionary, iterRes, id, parentId, depth })
  })
  calcResult?.Components.forEach(component => {
    const id = uuid()
    addComponent({ component, iterRes, id, parentId, depth })
    getSpecLines({ calcResult: component, getDictionary, iterRes, parentId: id, depth: depth + 1 })
  })
  return iterRes
}

const addMaterial = (props: IAddMaterial): void => {
  const { material, getDictionary, iterRes, id, parentId, depth } = props
  iterRes.push({
    values: [
      material.Title,
      getHumanUnit(material.ID, getDictionary),
      material.Price,
      material.Consumed,
      material.Forming,
      (material.Consumed - material.Forming).toFixed(3),
      material.Weight,
      material.Cost
    ],
    specLineType: ESpecLineType.Material,
    id,
    parentId,
    depth
  })
}

const addComponent = (props: IAddComponent): void => {
  const { component, iterRes, id, parentId, depth } = props
  iterRes.push({
    values: [
      component.Names.PrintName,
      'шт',
      component.Price.GrossPrice,
      1,
      '-',
      '-',
      component.Metrics.Weight.Value,
      component.Price.GrossPrice
    ],
    specLineType: ESpecLineType.Component,
    id,
    parentId,
    depth
  })
}

const getHumanUnit = (materialId: string, getDictionary: <T>(dictionaryName: string) => T): string => {
  const materialType = getDictionary<IMaterialType>(materialId)?.Type
  if (!materialType) return ''
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const materialUnit = getDictionary<IMaterialUnit>(`dictionaries.material_types.${materialType as string}`)?.Unit
  if (!materialUnit) return ''
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const humanUnit = getDictionary<IHumanUnit>(`dictionaries.units.${materialUnit as string}`)?.Symbol
  return humanUnit ?? ''
}

const hasHiddenParents = (specLines: ISpecLine[], specLine: ISpecLine, openComponents: Record<string, boolean>): boolean => {
  if (specLine.parentId === '') return false
  if (!openComponents[specLine.parentId]) return true
  const parentLine = specLines.find(item => item.id === specLine.parentId)
  if (parentLine === undefined) return false
  return hasHiddenParents(specLines, parentLine, openComponents)
}

export const getVisibleLines = (specLines: ISpecLine[], openComponents: Record<string, boolean>): ISpecLine[] => {
  return specLines.filter(specLine => !hasHiddenParents(specLines, specLine, openComponents))
}
