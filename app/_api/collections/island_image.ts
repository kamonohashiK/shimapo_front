import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { Collection } from "./collection";

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
    // TODO: 参照しているユーザーの情報を取得する
    const imageList = images.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      posted_at: this.convertTimestamp(doc.data().posted_at),
      //posted_by: doc.data().posted_by,
    }));

    return imageList;
  }

  // 島ごとの画像(拡大版)のメタデータを取得する
  async getLargeImages() {
    const q = query(
      this.collectionRef,
      where("type", "==", "large"),
      limit(10)
    );
    const images = await getDocs(q);
    // TODO: 参照しているユーザーの情報を取得する
    const imageList = images.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
      posted_at: this.convertTimestamp(doc.data().posted_at),
      //posted_by: doc.data().posted_by,
    }));

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
