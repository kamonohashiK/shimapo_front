import { IslandQuestionCollection } from "../collections/island_question";

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
