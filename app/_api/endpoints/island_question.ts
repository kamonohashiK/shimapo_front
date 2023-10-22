import { IslandQuestionCollection } from "../collections/island_question";
import { UserProfileCollection } from "../collections/user_profile";
import { UserActivityCollection } from "../collections/user_activity";
import { notificationTypes } from "@/app/_constants/notification_types";

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
    const p = new UserProfileCollection(userId);
    const a = new UserActivityCollection(userId);

    Promise.all([
      q.SaveQuestion(userId, question),
      p.updatePostedQuestions(),
      a.SaveActivity(islandId, notificationTypes.QUESTION, question, ""),
    ]);

    return true;
  } catch (error) {
    return false;
  }
}
