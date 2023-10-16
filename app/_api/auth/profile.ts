import { FirebaseAuth } from "./auth";
import { updateProfile } from "firebase/auth";

export class AuthProfile extends FirebaseAuth {
  // ユーザーのプロフィールを取得する
  async getProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      return profile;
    } else {
      return null;
    }
  }

  // プロフィールを更新する
  async updateProfile(name: string, photoUrl: string) {
    const user = this.auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
    } else {
      throw new Error("ユーザーが存在しません");
    }
  }
}
