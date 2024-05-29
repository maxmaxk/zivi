import styles from './styles.module.scss'

export const newLogin: JSX.Element = (
  <div className={styles.tooltip}>
    <p>
      <span
        className={`${styles.fragmentColor as string} ${styles.fragmentUnderline as string}`}>
          Обязательные условия
      </span>
    </p>
    <p>
      Отсутствие пробелов.<br />
      Общая длина:<br />
      не менее 4-х символов;<br />
      не более 20-и символов.
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
      подчёркивание: _ ;<br />
      дефис: - .
    </p>
  </div>
)
