import firebase_app from "@/firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// ファイルをストレージに保存して、そのURLを返す
export const uploadStorage = async (path: string, file: File) => {
  try {
    const storage = getStorage(firebase_app);
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);

    const gsReference = ref(
      storage,
      `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${path}`
    );
    return await getDownloadURL(gsReference)
      .then((url) => {
        return url;
      })
      .catch(() => {
        return "";
      });
  } catch (error) {
    return "";
  }
};
