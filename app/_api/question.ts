// questionsコレクションに対するAPI
import { QuestionAnswerCollection } from "./collections/question_answer";

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
    const qa = new QuestionAnswerCollection(islandId, questionId);
    await qa.updateLowEvaluation(answerId, userId);

    return true;
  } catch (error) {
    return false;
  }
}
