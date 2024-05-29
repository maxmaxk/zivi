import styles from './styles.module.scss'
import { type IValidLabel } from './types'

export const ValidLabel = (props: React.PropsWithChildren<IValidLabel>): JSX.Element => {
  const { title, isValid, area, regularFont = false, showStar = false } = props
  const getLabelClassName = (): string =>
    `${styles.label as string}
     ${regularFont ? styles.regularFont as string : ''}
     ${(isValid ? '' : styles.labelInvalid) as string}`
  const areaStyle = area !== undefined ? { gridArea: `area-${area}` } : {}
  return (
    <label className={getLabelClassName()} style={areaStyle}>
      <span>{title}</span>
      {showStar && <span className={styles.star}>*</span>}
      {props.children}
    </label>
  )
}
