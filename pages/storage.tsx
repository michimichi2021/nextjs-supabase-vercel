import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/supabase";

type UploadStorage = {
  fileList: FileList;
  bucketName: string;
};

type UploadPathname = {
  path: string;
};

export const uploadStorage = async ({
  fileList,
  bucketName,
}: UploadStorage): Promise<UploadPathname> => {
  try {
    const file = fileList[0]; // 今回はひとます1ファイルだけで
    const pathName = `characters/${uuidv4()}`; // ここは被らなければ何でも良い
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(pathName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
    return {
      path: data?.path ?? null,
    };
  } catch (error) {
    console.error({ error });
    return { path: null };
  }
};
