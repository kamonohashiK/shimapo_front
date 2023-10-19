import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Collection } from "./collection";
import { UserProfileCollection } from "./user_profile";

export class IslandImageCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(islandId: string) {
    super();
    this.docRef = doc(this.firestore, "islands", islandId);
    this.collectionRef = collection(this.docRef, "images");
  }

  // 島ごとの画像(サムネイル)のメタデータを取得する
  async getThumbnails() {
    const q = query(
      this.collectionRef,
      where("type", "==", "thumbnail"),
      limit(9)
    );
    const images = await getDocs(q);
    // NOTE: こちらではユーザー情報の取得はしない
    const imageList = images.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      posted_at: this.convertTimestamp(doc.data().posted_at),
    }));

    return imageList;
  }

  // 島ごとの画像(拡大版)のメタデータを取得する
  async getLargeImages() {
    const q = query(
      this.collectionRef,
      where("type", "==", "large"),
      limit(100)
    );

    const imageList = await Promise.all(
      (
        await getDocs(q)
      ).docs.map(async (doc) => {
        // posted_byの値から投稿したユーザーのIDを取得
        const userRef = doc.data().posted_by;
        const userDoc = await getDoc(userRef);
        const userId = userDoc.id;
        return {
          id: doc.id,
          url: doc.data().url,
          posted_at: this.convertTimestamp(doc.data().posted_at),
          posted_by: userId,
        };
      })
    );

    return imageList;
  }

  // 画像のメタデータを保存
  async saveImageMetadata(url: string, type: string, userId: string) {
    try {
      // ユーザーのプロフィールを参照
      const userRef = doc(this.firestore, "user_profiles", userId);
      // imagesコレクションに画像のメタデータを保存
      const collectionRef = collection(this.docRef, "images");
      const timeStamp = this.getTimestamp();
      await addDoc(collectionRef, {
        url: url,
        type: type,
        posted_at: timeStamp,
        posted_by: userRef,
      });
    } catch {
      throw new Error("画像のメタデータの保存に失敗しました");
    }
  }
}
