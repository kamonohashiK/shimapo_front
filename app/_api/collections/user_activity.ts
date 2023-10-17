import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Collection } from "./collection";

export class UserActivityCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(userId: string) {
    super();
    this.docRef = doc(this.firestore, "user_profiles", userId);
    this.collectionRef = collection(this.docRef, "activities");
  }

  // 直近1ヶ月間のアクティビティを取得
  async getActivities() {
    try {
      // 現時点より1ヶ月前のタイムスタンプを取得
      const oneMonthAgo = this.getTimestampOneMonthAgo();

      const q = query(
        this.collectionRef,
        where("posted_at", ">=", Timestamp.fromDate(oneMonthAgo))
      );
      const activities = await getDocs(q);
      const activityList = activities.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        content: doc.data().content,
        thumbnail_url: doc.data().thumbnail_url ?? "",
        posted_at: this.convertTimestamp(doc.data().posted_at),
        island: doc.data().island,
      }));

      return activityList;
    } catch {
      throw new Error("アクティビティの取得に失敗しました");
    }
  }
}
