import { useState } from 'react';
import { uploadStorage } from './storage';
import { supabase } from "../utils/supabase";

export default function Example(){
  const [ path,setPathName ] = useState<string | undefined>();
  const handleUploadStorage = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    const { path } = await uploadStorage({
      fileList,
      bucketName: "pictures",
    });
    const { data } = supabase.storage.from("pictures").getPublicUrl(path)
    if (path) setPathName(data.publicUrl);// セットされるように
    console.log(path)
  };
  return (
    <label htmlFor="file-upload">
      <span>アップロードする</span>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
				accept="image/png, image/jpeg"
        onChange={(e) => {
          const filiList = e.target?.files;
          console.log(filiList);
          handleUploadStorage(filiList);
        }}
      />
      <img src={path} alt="" width="800" height="500"/>;
    </label>
  );
};