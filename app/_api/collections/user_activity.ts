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
import { IslandCollection } from "./island";

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
      const activities = await Promise.all(
        (
          await getDocs(q)
        ).docs.map(async (doc) => {
          // 参照している島のデータを取得
          const island = new IslandCollection(doc.data().island.id);
          const islandData = await island.getData();
          if (islandData) {
            return {
              id: doc.id,
              island: {
                name: islandData.name,
                location: islandData.location,
              },
              content: doc.data().content,
              type: doc.data().type,
              posted_at: this.convertTimestamp(doc.data().posted_at),
              thumbnail_url: doc.data().thumbnail_url ?? "",
            };
          } else {
            throw new Error("アクティビティの取得に失敗しました");
          }
        })
      );

      return activities;
    } catch {
      throw new Error("アクティビティの取得に失敗しました");
    }
  }
}
