// questionsコレクションに対するAPI
import { db } from "@/firebase/config";
import {
  doc,
  addDoc,
  Timestamp,
  collection,
  increment,
  updateDoc,
} from "firebase/firestore";

// 質問を新規作成
export async function createQuestion(
  islandId: string,
  userId: string,
  question: string
) {
  try {
    const userRef = doc(db, "user_profiles", userId);
    const collectionRef = collection(db, "islands", islandId, "questions");
    const timeStamp = Timestamp.fromDate(new Date());

    await addDoc(collectionRef, {
      posted_at: timeStamp,
      question: question,
      posted_by: userRef,
      is_default: false,
      answer_count: 0,
      liked_count: 0,
      disliked_count: 0,
    });

    return true;
  } catch (error) {
    return false;
  }
}

// 回答を新規作成
export async function createAnswer(
  userId: string,
  islandId: string,
  questionId: string,
  answer: string,
  optionUrl: string
) {
  try {
    const userRef = doc(db, "user_profiles", userId);
    const questionRef = doc(db, "islands", islandId, "questions", questionId);
    const answersRef = collection(questionRef, "answers");
    const timeStamp = Timestamp.fromDate(new Date());

    await addDoc(answersRef, {
      answer: answer,
      option_url: optionUrl,
      liked_count: 0,
      disliked_count: 0,
      posted_by: userRef,
      posted_at: timeStamp,
    });

    // 質問の回答数を更新
    await updateDoc(questionRef, {
      answer_count: increment(1),
    });

    return true;
  } catch (error) {
    return false;
  }
}
