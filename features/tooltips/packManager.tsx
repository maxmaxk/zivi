import styles from './styles.module.scss'

export const packManager: JSX.Element = (
  <div className={styles.tooltip}>
    <p>Управление пакетом осуществляется
      <br/>через меню строки:&emsp;☰
    </p>
    <p>Расположение пакета в списке
      <br/>определяет очередь
      <br/>на применение этого пакета.
    </p>
    <p>Верхние пакеты
      <br/>являются первоочередными.
    </p>
    <p>Текущий пакет
      <br/>всегда расположен
      <br/>в первой строке.
    </p>
    <p>Раскраска строк:
      <br/><span className={`${styles.highlight as string} ${styles.current as string}`}>Текущий пакет (1-я строка)</span>
      <br/><span className={`${styles.highlight as string} ${styles.manually as string}`}>Активировано (очередь)</span>
      <br/><span className={`${styles.highlight as string} ${styles.auto as string}`}>Автоактивация (очередь)</span>
    </p>
    <p>Буквенные обозначения:
      <br/><b>А</b>: Активировано.
      <br/><b>Н</b>: Не активировано.
      <br/>—: Использовано.
    </p>
    <p>Использованные пакеты
      <br/>не управляются
      <br/>(меню строки недоступно).
    </p>
  </div>
)
