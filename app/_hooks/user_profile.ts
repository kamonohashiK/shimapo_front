import { GetUserProfileById } from "../_api/endpoints/user_profile";

export const useUserProfile = () => {
  const getUserProfileById = async (userId: string) => {
    const profile = await GetUserProfileById(userId);
    return profile;
  };

  return { getUserProfileById };
};
