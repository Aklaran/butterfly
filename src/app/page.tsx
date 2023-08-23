import styles from './page.module.css'
import { CheckConnection } from '@/components/fetcher'

export default async function Home() {
  const isConnected = await CheckConnection();

  return (<div><h1 className={styles.header}>{isConnected ? "You're in." : "Boo!"}</h1></div>)
}

