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
  updateDoc,
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
    const q = query(this.collectionRef, where("type", "==", "large"));

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
          liked_by: doc.data().liked_by ?? [],
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
        liked_by: [],
      });
    } catch {
      throw new Error("画像のメタデータの保存に失敗しました");
    }
  }

  // 画像データから投稿したユーザーのIDを取得
  async getPostedUserId(imageId: string) {
    try {
      const image = await getDoc(doc(this.collectionRef, imageId));
      if (image !== undefined) {
        return image.data()?.posted_by.id;
      } else {
        throw new Error("画像の取得に失敗しました");
      }
    } catch {
      throw new Error("画像の取得に失敗しました");
    }
  }

  // liked_byへ値を追加or削除
  async updateLikedBy(imageId: string, userId: string) {
    try {
      const imageRef = doc(this.collectionRef, imageId);
      const image = await getDoc(imageRef);
      const likedBy = image.data()?.liked_by ?? [];
      if (likedBy.includes(userId)) {
        // 既に高評価している場合は削除
        await updateDoc(imageRef, {
          liked_by: likedBy.filter((id: string) => id !== userId),
        });
      } else {
        // まだ高評価していない場合は追加
        await updateDoc(imageRef, {
          liked_by: [...likedBy, userId],
        });
      }
    } catch {
      throw new Error("画像の更新に失敗しました");
    }
  }
}
