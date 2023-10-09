// islandsコレクション関連のデータを扱うAPIを定義する

import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getIslandInfo(uid: string) {
  // 島の情報をDBから取得
  const docRef = doc(db, "islands", uid);
  const docSnap = await getDoc(docRef);

  // 画像のメタデータを取得
  var imageList: any = [];
  const images = await getDocs(collection(docRef, "images"));
  images.forEach((doc) => {
    imageList.push(doc.data());
  });

  // 質問を取得
  var questionList: any = [];
  const questions = await getDocs(collection(docRef, "questions"));
  questions.forEach((doc) => {
    questionList.push(doc.data());
  });

  return {
    islandInfo: docSnap.data(),
    imageList: imageList,
    questionList: questionList,
  };
}
