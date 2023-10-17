// questions/answersコレクションに対するAPI
import { notificationTypes } from "@/app/_constants/notification_types";
import { QuestionAnswerCollection } from "../collections/question_answer";
import { UserActivityCollection } from "../collections/user_activity";
import { UserProfileCollection } from "../collections/user_profile";
import { UserReactionCollection } from "../collections/user_reaction";

// 回答を新規作成
export async function createAnswer(
  userId: string,
  islandId: string,
  questionId: string,
  answer: string,
  optionUrl: string
) {
  try {
    // 元の質問文を取得
    const q = new QuestionAnswerCollection(islandId, questionId);
    await q.getQuestion().then(async (questionData) => {
      const questionText = questionData.data().question;
      const questionerId = questionData.data().posted_by.id;
      const content = questionText + ":" + answer;

      // 保存メソッドの呼び出し
      const ans = new QuestionAnswerCollection(islandId, questionId);
      const p = new UserProfileCollection(userId);
      const act = new UserActivityCollection(userId);
      const reaction = new UserReactionCollection(questionerId);

      await Promise.all([
        ans.saveAnswer(answer, optionUrl, userId),
        p.updatePostedAnswers(),
        act.SaveActivity(islandId, notificationTypes.ANSWER, content, ""),
        reaction.SaveReaction(
          userId,
          islandId,
          notificationTypes.ANSWER_QUESTION,
          content
        ),
      ]);
    });
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
    const p = new UserProfileCollection(userId);
    await qa
      .updateHighEvaluation(answerId, userId)
      .then(async (alreadyLiked) => {
        await p.updateLikedAnswers(!alreadyLiked);
      });

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
