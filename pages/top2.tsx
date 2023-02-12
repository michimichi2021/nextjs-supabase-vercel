// import React, { useState, useEffect } from "react";
// import { supabase } from "../utils/supabase";//supabaseの設定をimport


// const App = () => {
//   const [posts, setPosts] = useState([]); // useStateでsupabaseにarrayを保存する
//   console.log(posts);

//   // Formで使うuseState,Objectでsupabaseにデータを保存する
//   const [post, setPost] = useState({
//     title: "",
//     content: "",
//   });

//   // 編集Formで使うuseState,Objectでsupabaseにデータを保存する
//   const [post2, setPost2] = useState({
//     id: "",
//     title: "",
//     content: "",
//   });

//   console.log(post);

//   // supabaseからデータをGETする
//   useEffect(() => {
//     // 下に書いたfetchUsersを実行する
//     fetchPosts();
//   }, []);
//   // supabaseからusers tableの情報を取得する
//   async function fetchPosts() {
//     const { data } = await supabase.from("posts").select("*");
//     setPosts(data); // useStateにデータを保存する
//     console.log(data); // supabaseからデータがfetchできているかdebugする
//   }
//   // parameterでデータを渡す関数
//   function handleChange(event) {
//     // useStateにFormのデータを保存数r
//     setPost((prevFormData) => {
//       // prevFormDataは違う名前でも良い!
//       return {
//         ...prevFormData, // Objectのスプレッド演算子は複製やマージができる
//         [event.target.title]: event.target.value,
//       };
//     });
//   }
//   // parameterでデータを渡す関数
//   function handleChange2(event) {
//     // useStateにFormのデータを保存数r
//     setPost2((prevFormData) => {
//       // prevFormDataは違う名前でも良い!
//       return {
//         ...prevFormData, // Objectのスプレッド演算子は複製やマージができる
//         [event.target.title]: event.target.value,
//       };
//     });
//   }

//   // 新規作成の関数
//   async function createPost() {
//     await supabase.from("posts").insert({
//       title: post.title,
//       content: post.content,
//     });

//     fetchPosts();
//   }

//   // 削除をするための関数
//   async function deletePost(postId) {
//     // 古い書き方
//     //   const { data, error } = await supabase
//     // .from('users')
//     // .delete()
//     // .eq('id', userId)
//     // 新しい書き方. 2022/11/23
//     const { data, error } = await supabase.from("posts").delete().match({ id: postId });
//     console.log("新しい書き方で削除!");

//     fetchPosts();

//     if (error) {
//       console.log(error);
//     }

//     if (data) {
//       console.log(data);
//     }
//   }
//   // 編集ボタンの関数。ボタンを押すと、ユーザーの現在の名前と年齢が、
//   // 編集用の検索フォームに表示される
//   async function displayPost(postId) {

//     posts.map((post) => {
//       if (post.id == postId) {
//         setPost2({ id: post.id, title: post.title, content: post.content });
//       }
//     });
//   }
//   // 更新用の関数
//   // Form2の送信ボタンを押すと実行される
//   async function updatePost(postId) {
//    // 古い書き方
//     // const { data, error } = await supabase.from("users").update({ id: user2.id, name: user2.name, age: user2.age }).eq("id", userId);

//     // 新しい書き方. 2022/11/23
//       const { data, error } = await supabase
//     .from('posts')
//     .update({ id: post2.id,title: post2.title, content: post2.content })
//     .match({ id: postId })

//     fetchPosts();

//     if (error) {
//       console.log(error);
//     }

//     if (data) {
//       console.log(data);
//     }
//   }

//   return (
//     <div>
//       {/* FORM1 */}
//       <form onSubmit={createPost}>
//         <input type="text" placeholder="Name" name="name" onChange={handleChange} />

//         <input type="number" placeholder="Age" name="age" onChange={handleChange} />

//         <button type="submit">Create</button>
//       </form>

//       {/* FORM2 */}
//       {/* 更新の処理はアロー関数で書かないと画面に描画できないエラーが出た! */}
//       <form onSubmit={() => updatePost(post2.id)}>
//         <input type="text" name="name" onChange={handleChange2} defaultValue={post2.title} />

//         <input type="number" name="age" onChange={handleChange2} defaultValue={post2.content} />

//         <button type="submit">Save Changes</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post.id}>
//               <td>{post.id}</td>
//               <td>{post.content}</td>
//               <td>{post.title}</td>
//               <td>
//                 <button
//                   onClick={() => {
//                     deletePost(post.id);
//                   }}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => {
//                     displayPost(post.id);
//                   }}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;