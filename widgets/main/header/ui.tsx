import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import helpMarkerStyles from 'features/helpMarker/styles.module.scss'
import { type IHeader } from './types'
import { CloseIcon } from 'features/closeIcon'

export const Header = ({ isDemo, closeHandler }: IHeader): JSX.Element => {
  const onClose = (): void => {
    if (closeHandler) closeHandler()
  }
  return (
    <h2 className={styles.header}>
      {`Мастер расчёта${isDemo ? ', демо-режим' : ''}`}
      {isDemo && <Link className={helpMarkerStyles.helpMarkerDark} to="/" title="О полном доступе"></Link>}
      {!isDemo && <CloseIcon iconStyle='success' onClose={onClose}/>}
    </h2>
  )
}
