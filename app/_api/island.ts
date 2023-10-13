// islandsコレクション関連のデータを扱うAPIを定義する

import { db } from "@/firebase/config";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { convertTimestamp, getAnswers } from "./question";
import { IslandCollection } from "./collections/island";
import { IslandImageCollection } from "./collections/island_image";
import { IslandQuestionCollection } from "./collections/question";

// 島の情報を取得
export async function getIslandInfo(uid: string) {
  try {
    // 島の情報をDBから取得
    const islandCollection = new IslandCollection(uid);
    const docRef = islandCollection.docRef;
    const docSnap = await islandCollection.getSnapshot();

    // 画像のメタデータを取得
    const islandImageCollection = new IslandImageCollection(uid);
    const imageList = await islandImageCollection.getThumbnails();

    // 質問を取得 TODO: もっと簡略化したい
    const islandQuestionCollection = new IslandQuestionCollection(uid);
    const questions = await islandQuestionCollection.getQuestions();
    // 自身のIDを含めて渡す
    const questionList = questions.docs.map(async (doc) => ({
      id: doc.id,
      question: doc.data().question,
      answer_count: doc.data().answer_count,
      is_default: doc.data().is_default,
      posted_at: convertTimestamp(doc.data().posted_at),
      answers: await getAnswers(uid, doc.id),
    }));

    return {
      result: true,
      islandInfo: docSnap.data(),
      imageList: imageList,
      questionList: await Promise.all(questionList),
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
