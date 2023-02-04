import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function Edit(){
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => await indexPost())();
  }, []);

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



  // const updatePost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { error } = await supabase.from("posts").insert([
  //       {
  //         title: newTitle,
  //         content: newContent,
  //       },
  //     ]);
  //     if (error) throw error;

  //   } catch (error) {
  //     alert("データを更新できません");
  //   }
  // };

  // const updatePost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { error } = await supabase.from("posts").insert([
  //       {
  //         title: newTitle,
  //         content: newContent,
  //       },
  //     ]);
  //     if (error) throw error;

  //   } catch (error) {
  //     alert("データを更新できません");
  //   }
  // };


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
                  {/* <div>
                    <label htmlFor="image" className='mt-4'>画像を選択</label>
                    {props.url ? (
                      <Image
                        src={props.url}
                        alt="Avatar"
                        width="200"
                        height="200"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <div
                        className="avatar no-image"
                        style={{ height: "200px", width: "200px", borderRadius: "50%", background: "gray" }}
                      />
                    )}
                  </div> */}
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
                      <td><button onClick={() => deletePost(post.id)} className='border-gray-300 border-2 rounded p-1 w-12'>削除</button></td>
                      <td> <button onClick={()=>router.push("/edit")}>編集する</button></td>
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
