// questionsコレクションに対するAPI
import { db } from "@/firebase/config";
import {
  doc,
  addDoc,
  Timestamp,
  collection,
  increment,
  updateDoc,
  getDocs,
  getDoc,
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
      liked_by: [],
      disliked_by: [],
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

// 回答の一覧を取得
export async function getAnswers(islandId: string, questionId: string) {
  try {
    const questionRef = doc(db, "islands", islandId, "questions", questionId);
    const answersRef = collection(questionRef, "answers");
    const answers = await Promise.all(
      (
        await getDocs(answersRef)
      ).docs.map(async (doc) => {
        const userProfile = await getUserProfile(doc.data().posted_by.id);
        return {
          id: doc.id,
          posted_user: {
            name: userProfile?.name,
            image_url: userProfile?.image_url,
          },
          answer: doc.data().answer,
          option_url: doc.data().option_url,
          liked_by: doc.data().liked_by,
          disliked_by: doc.data().disliked_by,
          posted_at: convertTimestamp(doc.data().posted_at),
        };
      })
    );

    return answers;
  } catch (error) {
    return [];
  }
}

// 回答に高評価をつけるor取り消す
export async function ToggleLikeAnswer(
  islandId: string,
  questionId: string,
  answerId: string,
  userId: string
) {
  try {
    // 回答を取得
    const questionRef = doc(db, "islands", islandId, "questions", questionId);
    const answerRef = doc(questionRef, "answers", answerId);
    const answer = await getDoc(answerRef);
    // 回答のliked_byに自分のIDがあるか確認
    const likedBy = answer.data()?.liked_by;
    const isLiked = likedBy?.includes(userId);
    // あれば削除、なければ追加
    if (isLiked) {
      await updateDoc(answerRef, {
        liked_by: likedBy.filter((id: string) => id !== userId),
      });
    } else {
      await updateDoc(answerRef, {
        liked_by: [...likedBy, userId],
      });
    }

    return true;
  } catch (error) {
    return false;
  }
}

// 回答に低評価をつけるor取り消す
export async function ToggleDislikeAnswer(
  islandId: string,
  questionId: string,
  answerId: string,
  userId: string
) {
  try {
    // 回答を取得
    const questionRef = doc(db, "islands", islandId, "questions", questionId);
    const answerRef = doc(questionRef, "answers", answerId);
    const answer = await getDoc(answerRef);
    // 回答のliked_byに自分のIDがあるか確認
    const dislikedBy = answer.data()?.disliked_by;
    const isLiked = dislikedBy?.includes(userId);
    // あれば削除、なければ追加
    if (isLiked) {
      await updateDoc(answerRef, {
        disliked_by: dislikedBy.filter((id: string) => id !== userId),
      });
    } else {
      await updateDoc(answerRef, {
        disliked_by: [...dislikedBy, userId],
      });
    }

    return true;
  } catch (error) {
    return false;
  }
}

// ユーザーのプロフィールを取得する
async function getUserProfile(userId: string) {
  const profileRef = doc(db, "user_profiles", userId);
  const profile = await getDoc(profileRef);

  return profile.data();
}

// タイムスタンプを文字列に修正 TODO: この関数は共通化したい
export function convertTimestamp(t: any) {
  try {
    return t.toDate().toLocaleString("ja-JP");
  } catch (error) {
    return "";
  }
}
