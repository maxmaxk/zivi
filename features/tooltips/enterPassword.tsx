import styles from './styles.module.scss'

export const enterPassword: JSX.Element = (
  <p className={styles.p}>
    Если забыли пароль,<br />
    укажите <span className={styles.fragmentColor}>логин</span> или <span className={styles.fragmentColor}>e-mail</span><br />
    и нажмите кнопку<br />
    «Сброс пароля&hellip;»
  </p>
)
