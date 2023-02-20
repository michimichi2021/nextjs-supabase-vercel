import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

export default function SearchAnd() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    search2();
  }, []);


  const search2 = async () => {
    const { data: posts, error } = await supabase
      .from("posts")
      .select()
      .textSearch("title", `'bbb' & 'ccc'`);
    if (error) throw error;
    setPosts(posts);
    return;
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>検索機能</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div>
            <h1>AND検索機能</h1>
            <p>タイトルをbbbとcccで検索した場合</p>
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
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
