import { GetUserProfileById } from "../_api/endpoints/user_profile";
import { getUserActivities } from "../_api/endpoints/user_activity";
import { getUserReactions } from "../_api/endpoints/user_reaction";

export const useUserProfile = () => {
  // ユーザーのプロフィールを取得するフック
  const getUserProfileById = async (userId: string) => {
    const profile = await GetUserProfileById(userId);
    return profile;
  };

  // ユーザーのアクティビティを取得するフック
  const getUserActivitiesById = async (userId: string) => {
    const activities = await getUserActivities(userId);
    return activities;
  };

  // ユーザーのリアクションを取得するフック
  const getUserReactionsById = async (userId: string) => {
    const reactions = await getUserReactions(userId);
    return reactions;
  };

  return { getUserProfileById, getUserActivitiesById, getUserReactionsById };
};
