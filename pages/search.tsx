import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*");
    setPosts(data);
    console.log(data);
  }

  const search = async (value: string) => {
    if (value !== "") {
      const { data: posts, error } = await supabase
        .from("posts")
        .select()
        .textSearch("title", `${value}`);
      if (error) throw error;
      setPosts(posts);
      return;
    }else{
      await fetchPosts();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    search(e.target.value);
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
            <h1>完全一致検索機能</h1>
            <div>
              <input
                type="text"
                value={keyword}
                className="my-8  rounded border border-black"
                placeholder="search"
                onChange={(e) => handleChange(e)}
              />
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
