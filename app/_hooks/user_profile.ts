import { GetUserProfileById } from "../_api/endpoints/user_profile";
import { getUserActivities } from "../_api/endpoints/user_activity";

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

  return { getUserProfileById, getUserActivitiesById };
};
