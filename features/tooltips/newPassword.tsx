/* eslint-disable @typescript-eslint/quotes */
import styles from './styles.module.scss'

export const newPassword: JSX.Element = (
  <div className={styles.tooltip}>
    <p>
      <span
          className={`${styles.fragmentColor as string} ${styles.fragmentUnderline as string}`}>
            Обязательные условия
      </span>
    </p>
    <p>
      Отсутствие пробелов.<br/>
      Общая длина:<br/>
      не менее 8-и символов;<br/>
      не более 32-х символов.
    </p>
    <p>
      <span
        className={`${styles.fragmentColor as string} ${styles.fragmentUnderline as string}` }>
          Допустимые символы
      </span>
    </p>
    <p>
      Буквы латиницы (регистр любой).<br />
      Цифры.<br />
      Символы:<br />
      {`!@#$%^&*()_+-=[]{};':"\\|,.<>/?`}
    </p>
  </div>
)
