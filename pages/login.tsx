import { supabase } from "../utils/supabase";
import { useState } from "react"

export default function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")

  const onLogin = async(email:string, password: string) => {
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) {
      throw error;
    }
  }

  return (
    <section>
      <form onSubmit={onLogin}>
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
          <button type="submit">ログイン</button>
        </div>
      </form>
    </section>
  )
}
