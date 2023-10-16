import { FirebaseAuth } from "./auth";

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
}
