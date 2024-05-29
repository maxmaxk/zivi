import styles from './styles.module.scss'

export const autoActivationTool: JSX.Element = (
  <div className={styles.tooltip}>
    <p>Автоматическая активация.</p>
    <p>Не активированные пакеты
      <br/>будут активироваться
      <br/><b>автоматически</b>
      <br/>при завершении текущего пакета.
    </p>
    <p>Последовательность активации
      <br/>соответствует положению
      <br/>пакета в списке.
    </p>
    <p>Последовательность применения
      <br/>можно изменять посредством
      <br/>перемещения строк пакетов
      <br/>через меню строки:&emsp;☰
    </p>
    <p>Фон всех строк
      <br/>не активированных пакетов
      <br/>окрашивается в <span className={`${styles.highlight as string} ${styles.auto as string}`}>оранжевый</span>.
    </p>
  </div>
)
