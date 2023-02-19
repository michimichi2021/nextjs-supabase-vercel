import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export default function Top() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState<User | null>(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    (async () => {
      await indexPost();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    })();
  }, []);

  const addPost = async (e) => {
    if (user === null) return;

    e.preventDefault();
    try {
      const { error } = await supabase.from("posts").insert([
        {
          user_id: user.id,
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

  const handleDelete = async (postID: number) => {
    try {
      const res = await supabase.from("posts").delete().eq("id", postID);
      const { data: posts } = await supabase.from("posts").select("*");
      setPosts(posts);
      console.log("res", res, postID);
    } catch (error) {
      alert(error.message);
    }
  };

  const indexPost = async () => {
    try {
      const { data: posts, error } = await supabase.from("posts").select("*");
      if (error) throw error;
      setPosts(posts);
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

  const getBucket = async () => {
    const { data } = await supabase.storage.getBucket("pictures");

    console.log(data);
  };

  useEffect(() => {
    getBucket();
  }, []);

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
                      <td>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="border-gray-300 border-2 rounded p-1 w-12"
                        >
                          削除
                        </button>
                      </td>
                      {/* <td>
                      <button
                        onClick={() => {displayPost(post.id)}}
                        className="border-gray-300 border-2 rounded p-1 w-12"
                      >
                        更新
                      </button>
                      </td> */}
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
