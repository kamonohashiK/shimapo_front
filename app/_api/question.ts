// questionsコレクションに対するAPI
import { db } from "@/firebase/config";
import { doc, addDoc, Timestamp, collection } from "firebase/firestore";

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
      user_id: userId,
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
