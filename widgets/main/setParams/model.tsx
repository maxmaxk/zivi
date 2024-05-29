import {
  type ISelector,
  type IProductProperties,
  type IProductProperty
} from 'entities/stores/product/types'
import { EPart, type IParentChildProperties } from './types'
import styles from './styles.module.scss'
import { RenderProperty } from './renderProperty'

const getHalfArray = <T,>(arr: T[], part: EPart): T[] => {
  if (arr.length < 2) return arr
  const center = Math.ceil(arr.length / 2)
  return part === EPart.Left ? arr.slice(0, center) : arr.slice(center)
}

const getChildParent = (property: IProductProperty, selector: ISelector): string => {
  const condition = property.conditional
  if (condition === undefined) return ''
  const isChildVisible = Object.entries(condition).reduce((enabled, [property, enableValues]) => (
    enabled && enableValues.includes(selector[property].value as string)
  ), true)
  return isChildVisible ? Object.keys(condition)[0] : ''
}

export const getParentChildProperties = (productProperties: IProductProperties, selector: ISelector): IParentChildProperties => {
  let parents = {}
  const childs: Record<string, string[]> = {}
  Object.entries(productProperties).forEach(([property, item]) => {
    if (item.conditional) {
      const childParent = getChildParent(item, selector)
      if (childParent !== '') {
        if (!childs[childParent]) {
          childs[childParent] = [property]
        } else {
          childs[childParent].push(property)
        }
      }
    } else {
      parents = { ...parents, [property]: item }
    }
  }, {})
  return { parents, childs }
}

export const getPropertyControls = (productProperties: IParentChildProperties, part: EPart): JSX.Element => {
  const productPropertiesArr = getHalfArray(Object.entries(productProperties.parents), part)
  return (
    <>
      {
        productPropertiesArr.map(([id]) => {
          return (
            <div key={id} className={styles.row}>
              <RenderProperty id={id}/>
              {productProperties.childs[id]?.map((childId, index) => {
                return <RenderProperty key={`${id}${index}`} id={childId} isChild={true}/>
              })}
            </div>
          )
        })
      }
    </>
  )
}
