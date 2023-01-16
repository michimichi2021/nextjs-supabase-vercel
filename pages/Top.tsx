import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Top() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => await indexPost())();
  }, []);

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
      await indexPost();
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      alert("データの新規登録ができません");
    }
  };

  const indexPost = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      alert(error.message);
      setPosts([]);
    }
  };

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        throw logoutError;
      }
      await router.push("/");
    } catch {
      alert("エラーが発生しました");
    }
  };
  return (
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
              <form onSubmit={addPost}>
                <div>
                  <div>
                    <label>タイトル</label>
                    <br />
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>内容</label>
                    <br />
                    <textarea
                      value={newContent}
                      rows={10}
                      cols={40}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                  </div>
                  <div>
                    <button type="submit">登録</button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>投稿日</th>
                    <th>タイトル</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.created_at.substr(0, 10)}</td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <form onSubmit={Logout}>
                <button type="submit">ログアウトする</button>
              </form>
            </div>
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
