import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

export default function SignUp(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")

  const supabase = createClient('https://jfzvzraievkoirlejwur.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ6cmFpZXZrb2lybGVqd3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzE2NjYsImV4cCI6MTk4MzkwNzY2Nn0.3kOn1eB3rDFfOc02P3rsF_QyIpCqQR5aA_4F-O-SD5A')

  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      const { error:signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (signUpError) {
        throw signUpError;
      }
     alert('登録完了メールを確認してください');
    }catch(error){
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div className={styles.container}>
      <Head>
        <title>新規登録画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
          />
        <form onSubmit={onSubmit}>
        <div>
          <label>メールアドレス</label>
          <input type="email"
            required value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input type="password"
            required value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード（確認）</label>
          <input type="password"
            required value={passwordConf}
            onChange={e => setPasswordConf(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">サインアップ</button>
        </div>
      </form>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </>
  )
}
