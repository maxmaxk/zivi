import styles from './styles.module.scss'

export const Draw2D = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.noModel}>Эскиз изделия находится в разработке</div>
    </div>
  )
}
