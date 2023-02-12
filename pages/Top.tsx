import Head from "next/head";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useParams, useNavigate , Link} from "react-router-dom";

export default function Top() {
  let { id } = useParams();
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState<User | null>(null);

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

    // 編集Formで使うuseState,Objectでsupabaseにデータを保存する
    const [post2, setPost2] = useState({
      id: "",
      title: "",
      content: "",
    });

    // console.log(post2);

  const handleChange2= async(event) => {
    // useStateにFormのデータを保存数r
    setPost2((prevFormData) => {
      // prevFormDataは違う名前でも良い!
      return {
        ...prevFormData, // Objectのスプレッド演算子は複製やマージができる
        [event.target.title]: event.target.value,
      };
    });
  }

  const displayPost= async(postId) =>{

    posts.map((post) => {
      if (post.id == postId) {
        setPost2({ id: post.id,title: post.title, content: post.content });
      }
    });
  }

  // supabaseからデータをGETする
  useEffect(() => {
    // 下に書いたfetchUsersを実行する
    fetchPosts();
  }, []);
  // supabaseからusers tableの情報を取得する
  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*");
    setPosts(data); // useStateにデータを保存する
    console.log(data); // supabaseからデータがfetchできているかdebugする
  }

  // 更新用の関数
  // Form2の送信ボタンを押すと実行される
  const updatePost = async(postID)=> {
    if (user === null) return;

    try {
      const { data, error } = await supabase
      .from('posts')
      .update({ id: post2.id,title: post2.title, content: post2.content })
      .match({ id: postID })
      if (error) throw error;
      console.log(data , postID);
      fetchPosts();
    } catch (error) {
      alert("データの更新ができません");
    }
  }



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
              <form onSubmit={() => updatePost(post2.id)}>
                <input type="text" name="title" onChange={handleChange2} defaultValue={post2.title} />
                <input type="text" name="content" onChange={handleChange2} defaultValue={post2.content} />
                <button type="submit">編集</button>
              </form>
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
                      <td>
                      <button
                        onClick={() => {displayPost(post.id)}}
                        className="border-gray-300 border-2 rounded p-1 w-12"
                      >
                        更新
                      </button>
                      </td>
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
