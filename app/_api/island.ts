// islandsコレクション関連のデータを扱うAPIを定義する

import { db } from "@/firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// 島の情報を取得
export async function getIslandInfo(uid: string) {
  try {
    // 島の情報をDBから取得
    const docRef = doc(db, "islands", uid);
    const docSnap = await getDoc(docRef);

    // 画像のメタデータを取得
    var imageList: any = [];
    const imageRef = collection(docRef, "images");
    const q = query(imageRef, where("type", "==", "thumbnail"));
    const images = await getDocs(q);
    images.forEach((doc) => {
      imageList.push(doc.data());
    });

    // 質問を取得
    var questionList: any = [];
    const questions = await getDocs(
      query(collection(docRef, "questions"), orderBy("posted_at", "desc"))
    );
    questions.forEach((doc) => {
      questionList.push(doc.data());
    });

    return {
      result: true,
      islandInfo: docSnap.data(),
      imageList: imageList,
      questionList: questionList,
    };
  } catch (error) {
    return { result: false };
  }
}

// 画像URLを保存
export async function saveImageUrl(
  islandId: string,
  userId: string,
  url: string,
  type: string
) {
  try {
    const userRef = doc(db, "user_profiles", userId);
    const collectionRef = collection(db, "islands", islandId, "images");
    const timeStamp = Timestamp.fromDate(new Date());
    await addDoc(collectionRef, {
      url: url,
      type: type,
      posted_at: timeStamp,
      posted_by: userRef,
    });

    return true;
  } catch (error) {
    return false;
  }
}
