import { FirebaseAnalytics } from "../analytics";
import { UserActivityCollection } from "../collections/user_activity";

const analytics = new FirebaseAnalytics();

export async function getUserActivities(userId: string) {
  try {
    analytics.logGetActivities(userId);
    // 直近1ヶ月間のアクティビティを取得
    const userActivity = new UserActivityCollection(userId);
    const activities = await userActivity.getActivities();
    return {
      result: true,
      activities,
    };
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "unknown error";
    analytics.logGetActivities(userId, true, errorMessage);

    return { result: false };
  }
}
