import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from 'next/link';

export default function Home() {
  return(
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Blog</h1>
        <div className={styles.grid}>
          <Link href='/top'>
            トップページ
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>

  );
}