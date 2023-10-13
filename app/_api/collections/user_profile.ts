import {
  DocumentReference,
  DocumentData,
  doc,
  CollectionReference,
  collection,
  getDoc,
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
}
