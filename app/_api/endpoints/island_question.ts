import { IslandQuestionCollection } from "../collections/island_question";
import { UserProfileCollection } from "../collections/user_profile";
import { UserActivityCollection } from "../collections/user_activity";
import { notificationTypes } from "@/app/_constants/notification_types";
import { FirebaseAnalytics } from "../analytics";
import { QueueCollection } from "../collections/queue";
import { queues } from "@/app/_constants/queues";

const analytics = new FirebaseAnalytics();

// 島に関する質問と回答を取得 (質問関連のアクション後のリロード想定で)
export async function getQuestions(islandId: string) {
  try {
    const islandQuestion = new IslandQuestionCollection(islandId);
    analytics.logGetQuestions(islandId);
    const questionList = await islandQuestion.getQuestionsWithAnswers();

    return await Promise.all(questionList);
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "unknown error";
    analytics.logGetQuestions(islandId, true, errorMessage);

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
    const queue = new QueueCollection();
    analytics.logCreateQuestion(islandId);

    Promise.all([
      q.SaveQuestion(userId, question),
      p.updatePostedQuestions(),
      a.SaveActivity(islandId, notificationTypes.QUESTION, question, ""),
      queue.saveQueue(queues.QUESTION, {
        island_id: islandId,
      }),
    ]);

    return true;
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "unknown error";
    analytics.logCreateQuestion(islandId, true, errorMessage);

    return false;
  }
}
