// user_profilesにデータが存在しない場合、新規作成する

import { db } from "@/firebase/config";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export type UserProfileProps = {
  userId: string;
  name: string;
  image_url: string;
};

// user_profilesにデータが存在しない場合、新規作成する
export async function CreateUserProfile(profile: UserProfileProps) {
  try {
    const docRef = doc(db, "user_profiles", profile.userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, profile);
    }
  } catch (error) {
    return false;
  }
}
