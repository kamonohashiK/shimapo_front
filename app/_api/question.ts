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
  orderBy,
  query,
} from "firebase/firestore";
import { IslandQuestionCollection } from "./collections/question";
import { QuestionAnswerCollection } from "./collections/question_answer";

// 島に関する質問と回答を取得 (質問関連のアクション後のリロード想定で)
export async function getQuestions(islandId: string) {
  try {
    const islandQuestion = new IslandQuestionCollection(islandId);
    const questionList = await islandQuestion.getQuestionsWithAnswers();

    return await Promise.all(questionList);
  } catch (error) {
    return [];
  }
}

// 質問を新規作成
export async function createQuestion(
  islandId: string,
  userId: string,
  question: string
) {
  try {
    const q = new IslandQuestionCollection(islandId);
    await q.SaveQuestion(userId, question);

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
    const ans = new QuestionAnswerCollection(islandId, questionId);
    await ans.saveAnswer(answer, optionUrl, userId);

    return true;
  } catch (error) {
    return false;
  }
}

// 回答の一覧と回答者のプロフィールを合わせて取得
export async function getAnswers(islandId: string, questionId: string) {
  try {
    const ans = new QuestionAnswerCollection(islandId, questionId);
    const answers = await ans.getAnswers();

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
    const qa = new QuestionAnswerCollection(islandId, questionId);
    await qa.updateHighEvaluation(answerId, userId);

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
    const isDisliked = dislikedBy?.includes(userId);
    // あれば削除、なければ追加
    if (isDisliked) {
      const newDislikedBy = dislikedBy.filter((id: string) => id !== userId);
      const disLikeCount = newDislikedBy.length;
      await updateDoc(answerRef, {
        dislike_count: disLikeCount,
        disliked_by: newDislikedBy,
      });
    } else {
      const newDislikedBy = [...dislikedBy, userId];
      const disLikeCount = newDislikedBy.length;
      await updateDoc(answerRef, {
        dislike_count: disLikeCount,
        disliked_by: newDislikedBy,
      });
    }

    return true;
  } catch (error) {
    return false;
  }
}

// タイムスタンプを文字列に修正 TODO: この関数は共通化したい
export function convertTimestamp(t: any) {
  try {
    return t.toDate().toLocaleString("ja-JP");
  } catch (error) {
    return "";
  }
}
