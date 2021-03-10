import Head from 'next/head'
import TaskList from '../components/TaskList';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TaskList />
      
    </div>
  )
}
