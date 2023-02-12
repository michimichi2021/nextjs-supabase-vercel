import Head from "next/head";
import styles from "../styles/Home.module.css";
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'


export default function Google(){


  const supabase = createClient('https://jfzvzraievkoirlejwur.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ6cmFpZXZrb2lybGVqd3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzE2NjYsImV4cCI6MTk4MzkwNzY2Nn0.3kOn1eB3rDFfOc02P3rsF_QyIpCqQR5aA_4F-O-SD5A')


  return (
    <>
      <div className={styles.container}>
      <Head>
        <title>Google認証画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
          />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </>
  )
}


