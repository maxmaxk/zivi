import { type ICaption } from './types'
import styles from './styles.module.scss'

export const Caption = ({ title, area }: ICaption): JSX.Element => {
  const areaStyle = area !== undefined ? { gridArea: `area-${area}` } : {}
  return (
    <h1
      className={styles.caption}
      style={areaStyle}>
        {title}
    </h1>
  )
}
