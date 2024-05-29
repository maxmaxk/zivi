import { Master } from 'widgets/main/master'
import styles from './styles.module.scss'

export const Main = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <Master isDemo={true}/>
    </main>
  )
}
