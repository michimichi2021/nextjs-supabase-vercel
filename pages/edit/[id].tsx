// import Head from "next/head";
// import { supabase } from "../../utils/supabase";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { User } from "@supabase/supabase-js";


// export default function Edit(){
//   let { id } = useParams();

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);


//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handelSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !content) {
//       setError("Field can not be empty !");
//       return;
//     }

//     const { data, error } = await supabase
//       .from("posts")
//       .update({ title, content })
//       .eq("id", id);

//     if (data) {
//       setSuccess("Entry updated. Going back.");
//       setTimeout(() => {
//         navigateTo(`/top`);
//       }, 2000);
//     }
//   };

//   const dataFetching = async () => {
//     const { data, error } = await supabase
//       .from("posts")
//       .select()
//       .eq("id", id)
//       .single();

//     if (error) {
//     }

//     if (data) {
//       setTitle(data.title);
//       setContent(data.content);
//     }
//   };

//   useEffect(() => {
//     dataFetching();
//   }, [id]);



//   return (
//     <>
//         <Head>
//           <title>編集ページ</title>
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
//           <h1>編集ページ</h1>
//           <form className="max-w-md mx-auto space-y-4" onSubmit={handelSubmit}>
//           <h1 className="font-semibold">Update an Entry</h1>
//           <div className="space-y-2">
//             <p>Name</p>
//             <input
//               value={post.title}
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//               className="w-full px-3 py-3 bg-transparent border-2 border-[#5c5c5c] text-sm outline-none focus:border-white duration-200"
//             />
//           </div>

//           <div className="space-y-2">
//             <p>Author</p>
//             <input
//               value={post.content}
//               onChange={(e) => setContent(e.target.value)}
//               type="text"
//               name="author"
//               className="w-full px-3 py-3 bg-transparent border-2 border-[#5c5c5c] text-sm outline-none focus:border-white duration-200"
//             />
//           </div>

//           <input
//             type="submit"
//             value="Update"
//             className="block w-full p-3 rounded-sm text-sm bg-black outline-none cursor-pointer"
//           />
//         </form>
//     </>
//   );
// }
