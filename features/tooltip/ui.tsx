import type { TParentType, ITooltip } from './types'
import styles from './styles.module.scss'
import helpMarkerStyles from 'features/helpMarker/styles.module.scss'

export const Tooltip = (props: ITooltip): JSX.Element => {
  const { tooltipContent, parentType = 'input', contentSide = 'onLeft' } = props
  const getRight = (parentType: TParentType): number => {
    if (parentType === 'input') return 9
    if (parentType === 'table') return 35
    return -4
  }
  const getTop = (parentType: TParentType): number => {
    if (parentType === 'checkbox') return 0
    if (parentType === 'table') return -8
    if (parentType === 'form') return 3
    return -5
  }
  if (!tooltipContent) return <></>
  const boxTooltipStyle = {
    right: getRight(parentType),
    top: getTop(parentType)
  }
  return (
    <div className={styles.boxTooltip} style={boxTooltipStyle}>
      <span className={
        `${styles.controlTooltip as string}
         ${helpMarkerStyles.helpMarkerDark as string}
         ${helpMarkerStyles.helpMarkerSolid as string}`
      }>
      </span>
      <div className={styles.tooltipContent} style={{ left: contentSide === 'onRight' ? 8 : undefined }}>
        {tooltipContent}
      </div>
    </div>
  )
}
