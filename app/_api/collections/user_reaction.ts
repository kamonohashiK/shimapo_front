import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Collection } from "./collection";
import { IslandCollection } from "./island";
import { UserProfile } from "@/app/_components/mypage/user_profile/_";
import { UserProfileCollection } from "./user_profile";

export class UserReactionCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(userId: string) {
    super();
    this.docRef = doc(this.firestore, "user_profiles", userId);
    this.collectionRef = collection(this.docRef, "reactions");
  }

  // 直近1ヶ月間のリアクションを取得
  async getReactions() {
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
          // 参照しているユーザーのデータを取得
          const user = new UserProfileCollection(doc.data().user.id);
          const userData = await user.getProfile();
          if (islandData && userData) {
            return {
              id: doc.id,
              island: {
                name: islandData.name,
                location: islandData.location,
              },
              user: {
                name: userData.name,
                image_url: userData.image_url,
              },
              content: doc.data().content,
              type: doc.data().type,
              posted_at: this.convertTimestamp(doc.data().posted_at),
            };
          } else {
            throw new Error("リアクションの取得に失敗しました");
          }
        })
      );

      return activities;
    } catch {
      throw new Error("リアクションの取得に失敗しました");
    }
  }
}
