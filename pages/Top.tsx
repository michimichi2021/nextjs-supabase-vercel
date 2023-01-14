import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useRouter } from 'next/router';
import { useState } from 'react';



export default function Top(){
  const router = useRouter();

  const usePost = async (e) => {
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    e.preventDefault();
    try {
      const { error } = await supabase.from("posts").insert([
        {
          title: newTitle,
          content: newContent,
        },
      ]);
     if (error) throw error;

       setNewTitle("");
       setNewContent("");
    } catch (error) {
       alert(error.message);
    }
  };


  const indexPost = async(e) => {
    try {
      e.preventDefault();
      const { error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const updatePost = (e) => {
    e.preventDefault();
  };

  const deletePost = (e) => {
    e.preventDefault();
  };

  const Logout = async(e) => {
    e.preventDefault();
    try{
      const { error:logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError;
      }
      await router.push("/");
    }catch{
      alert('エラーが発生しました');
    }
  }
  return(
    <>
      <div className={styles.container}>
      <Head>
        <title>トップページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>トップページ</h1>
           <div>
              <div>
                <label>タイトル</label><br/>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label>内容</label><br/>
                <textarea name="name" rows={10} cols={40}  onChange={(e) => setNewContent(e.target.value)}/>
              </div>
              <div>
                <button type="submit">登録</button>
              </div>
            </div>
           <div>
            <form onSubmit={Logout}>
              <button type="submit">ログアウトする</button>
            </form>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </>
  )
}