// user_profilesにデータが存在しない場合、新規作成する
import { UserProfileCollection } from "../collections/user_profile";

export type UserProfileProps = {
  name: string;
  image_url: string;
  liked_answers: number;
  liked_images: number;
  posted_answers: number;
  posted_images: number;
  posted_questions: number;
};

// user_profilesにデータが存在しない場合、新規作成する
export async function CreateUserProfile(
  userId: string,
  profile: UserProfileProps
) {
  try {
    const prof = new UserProfileCollection(userId);

    if ((await prof.isExist()) === false) {
      await prof.saveProfile(profile);
    }
  } catch (error) {
    return false;
  }
}

// user_profilesのデータを取得する
export async function GetUserProfileById(userId: string) {
  try {
    const prof = new UserProfileCollection(userId);
    const data = await prof.getProfile();
    return data;
  } catch (error) {
    return false;
  }
}

export async function updatePostedImages(userId: string) {
  try {
    const prof = new UserProfileCollection(userId);
    await prof.updatePostedImages();
    return true;
  } catch (error) {
    return false;
  }
}
