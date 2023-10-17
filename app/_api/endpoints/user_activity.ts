import { UserActivityCollection } from "../collections/user_activity";

export async function getUserActivities(userId: string) {
  try {
    // 直近1ヶ月間のアクティビティを取得
    const userActivity = new UserActivityCollection(userId);
    const activities = await userActivity.getActivities();
    return {
      result: true,
      activities,
    };
  } catch (error) {
    return { result: false };
  }
}
