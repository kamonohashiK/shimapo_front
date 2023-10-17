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
  addDoc,
} from "firebase/firestore";
import { Collection } from "./collection";
import { IslandCollection } from "./island";
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

  // リアクションを保存
  async SaveReaction(
    userId: string,
    islandId: string,
    type: string,
    content: string
  ) {
    try {
      // 参照している情報を取得
      const userRef = doc(this.firestore, "user_profiles", userId);
      const islandRef = doc(this.firestore, "islands", islandId);

      if (userRef && islandRef) {
        // リアクションの保存
        await addDoc(this.collectionRef, {
          content: content,
          type: type,
          user: userRef,
          island: islandRef,
          read: false,
          posted_at: Timestamp.now(),
          expired_at: Timestamp.fromDate(this.getTimestampOneMonthLater()),
        });
      } else {
        throw new Error("参照データがないためリアクションの保存に失敗しました");
      }
    } catch {
      throw new Error("リアクションの保存に失敗しました");
    }
  }
}
