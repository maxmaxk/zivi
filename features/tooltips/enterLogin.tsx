import styles from './styles.module.scss'

export const enterLogin: JSX.Element = (
  <div className={styles.tooltip}>
    <p>По <span className={styles.fragmentColor}>логину</span> можно<br />войти или сбросить пароль.</p>
    <p>По <span className={styles.fragmentColor}>e-mail</span> можно<br />только сбросить пароль.</p>
  </div>
)
