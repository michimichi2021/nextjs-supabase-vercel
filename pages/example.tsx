import { useState } from 'react';
import { uploadStorage } from './storage';

export default function Example(){
  const [ path,setPathName ] = useState<string | undefined>();
  const handleUploadStorage = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    const { path } = await uploadStorage({
      fileList,
      bucketName: "pictures",
    });
    if (path) setPathName(path);// セットされるように
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
          handleUploadStorage(filiList);
        }}
      />
      <img src={path} />;
    </label>
  );
};