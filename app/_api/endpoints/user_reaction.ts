import { FirebaseAnalytics } from "../analytics";
import { UserReactionCollection } from "../collections/user_reaction";

const analytics = new FirebaseAnalytics();

export async function getUserReactions(userId: string) {
  try {
    analytics.logGetReactions(userId);
    // 直近1ヶ月間のリアクションを取得
    const userReaction = new UserReactionCollection(userId);
    const reactions = await userReaction.getReactions();
    return {
      result: true,
      reactions,
    };
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "unknown error";
    analytics.logGetReactions(userId, true, errorMessage);

    return { result: false };
  }
}
