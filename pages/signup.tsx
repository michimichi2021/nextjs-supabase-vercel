import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { useRouter } from 'next/router'

export default function SignUp(){
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")

  const onSubmit = async(email:string, password: string) => {
    try{
      const { error:signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (signUpError) {
        throw signUpError;
      }
      await router.push("/login");
    }catch(error){
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
