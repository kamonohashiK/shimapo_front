import firebase_app from "@/firebase/config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadStorage = async (path: string, file: File) => {
  try {
    const storage = getStorage(firebase_app);
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);

    console.log("アップロード完了", snapshot);
    // TODO: アップロードしたファイルのURLを返すようにする
    return { key: snapshot.metadata.name, url: snapshot.metadata.fullPath };
  } catch (error) {
    console.log("アップロード失敗", error);
    return null;
  }
};
