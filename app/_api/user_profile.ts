// user_profilesにデータが存在しない場合、新規作成する
import { UserProfileCollection } from "./collections/user_profile";

export type UserProfileProps = {
  userId: string;
  name: string;
  image_url: string;
};

// user_profilesにデータが存在しない場合、新規作成する
export async function CreateUserProfile(profile: UserProfileProps) {
  try {
    const prof = new UserProfileCollection(profile.userId);

    if ((await prof.isExist()) === false) {
      await prof.saveProfile(profile);
    }
  } catch (error) {
    return false;
  }
}
