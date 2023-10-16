import { AuthProfile } from "../auth/profile";

// ユーザーのプロフィールを取得する
export async function getUserProfile() {
  const profile = new AuthProfile();
  const result = await profile.getProfile();

  return result;
}
