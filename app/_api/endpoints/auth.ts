import { AuthProfile } from "../auth/profile";

// ユーザー自身のプロフィールを取得する
export async function getSelfProfile() {
  // TODO: エラーの捕捉のみ行う
  const profile = new AuthProfile();
  const result = await profile.getProfile();

  return result;
}
