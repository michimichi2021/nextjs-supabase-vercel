/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import { supabase } from "../../../utils/supabase";
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import indexPost from '../../top';

export default function Top(){
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("posts").insert([
        {
          title: newTitle,
          content: newContent,
        },
      ]);
      if (error) throw error;
      await router.push("/top");
      setNewTitle("")
      setNewContent("")
    } catch (error) {
       alert(error.message);
    }
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
      <div>
      <Head>
        <title>新規投稿機能</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <form onSubmit={addPost}>
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
          </form>
          <div>
            <form onSubmit={Logout}>
              <button type="submit">ログアウトする</button>
            </form>
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
    </>
  )
}