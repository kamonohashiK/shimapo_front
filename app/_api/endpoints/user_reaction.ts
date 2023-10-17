import { UserReactionCollection } from "../collections/user_reaction";

export async function getUserReactions(userId: string) {
  try {
    // 直近1ヶ月間のリアクションを取得
    const userReaction = new UserReactionCollection(userId);
    const reactions = await userReaction.getReactions();
    return {
      result: true,
      reactions,
    };
  } catch (error) {
    return { result: false };
  }
}
