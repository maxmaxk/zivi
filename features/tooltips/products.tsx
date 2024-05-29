import styles from './styles.module.scss'

export const productsTool: JSX.Element = (
  <div className={styles.tooltip}>
    <p>
      Пересчёт изделий
      <br/>c неактуальными данными
      <br/>для выбранных позиций.
    </p>
    <p>
      Кнопка пересчёта
      <br/>доступна, если выбрана
      <br/>хотя бы одна позиция.
    </p>
    <p>
      Выбор позиций (флаг)
      <br/>доступен только для позиций
      <br/>c неактуальными данными:
      <br/><span className={`${styles.highlight as string} ${styles.content as string}`}>выделены цветом</span>
    </p>
  </div>
)
