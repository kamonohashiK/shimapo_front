import {
  DocumentReference,
  DocumentData,
  doc,
  CollectionReference,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Collection } from "./collection";

export class UserProfileCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(userId: string) {
    super();
    this.docRef = doc(this.firestore, "user_profiles", userId);
    this.collectionRef = collection(this.docRef, "user_profiles");
  }

  // プロフィールを取得
  async getProfile() {
    try {
      const profile = await getDoc(this.docRef);
      return profile.data();
    } catch {
      throw new Error("プロフィールの取得に失敗しました");
    }
  }

  // 既存データが存在するか
  async isExist() {
    try {
      const profile = await getDoc(this.docRef);
      return profile.exists();
    } catch {
      throw new Error("プロフィールの取得に失敗しました");
    }
  }

  // プロフィールを作成
  async saveProfile(profile: any) {
    try {
      await setDoc(this.docRef, profile);
    } catch {
      throw new Error("プロフィールの保存に失敗しました");
    }
  }

  // 表示名・画像URLを更新
  async updateProfile(name: string, imageUrl: string) {
    try {
      await updateDoc(this.docRef, { name: name, image_url: imageUrl });
      return true;
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  }

  // 画像の投稿数を更新
  async updatePostedImages() {
    try {
      await updateDoc(this.docRef, { posted_images: increment(1) });
      return true;
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  }

  // 質問数を更新
  async updatePostedQuestions() {
    try {
      await updateDoc(this.docRef, { posted_questions: increment(1) });
      return true;
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  }

  // 回答数を更新
  async updatePostedAnswers() {
    try {
      await updateDoc(this.docRef, { posted_answers: increment(1) });
      return true;
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  }

  // 回答への高評価数を更新
  async updateLikedAnswers(isIncrement: boolean) {
    try {
      const number = isIncrement ? 1 : -1;
      await updateDoc(this.docRef, { liked_answers: increment(number) });
      return true;
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  }
}
