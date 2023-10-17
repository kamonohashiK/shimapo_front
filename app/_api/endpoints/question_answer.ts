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
        if (!alreadyLiked) {
          Promise.all([
            await p.updateLikedAnswers(false),
            await createLikeReaction(userId, islandId, questionId, answerId),
          ]);
        } else {
          Promise.all([await p.updateLikedAnswers(true)]);
        }
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

// 高評価時のリアクションを作成する
async function createLikeReaction(
  userId: string,
  islandId: string,
  questionId: string,
  answerId: string
) {
  try {
    console.log("createLikeReaction");
    const qa = new QuestionAnswerCollection(islandId, questionId);
    // いいねをつけた回答の回答者に通知を送る
    const answer = await qa.getAnswer(answerId);
    const answererId = answer.data().posted_by.id;

    // 質問文と回答を結合して通知文を作成
    const question = await qa.getQuestion();
    const questionText = question.data().question;
    const content = questionText + ":" + answer.data().answer;

    const reaction = new UserReactionCollection(answererId);
    await reaction.SaveReaction(
      userId,
      islandId,
      notificationTypes.LIKE_ANSWER,
      content
    );
  } catch (error) {
    throw new Error("リアクションの作成に失敗しました");
  }
}
