import { AuthProfile } from "../auth/profile";

// ユーザー自身のプロフィールを取得する
export async function getSelfProfile() {
  const profile = new AuthProfile();
  const result = await profile.getProfile();

  return result;
}
