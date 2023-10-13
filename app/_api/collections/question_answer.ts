import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  addDoc,
  updateDoc,
  increment,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { Collection } from "./collection";
import { UserProfileCollection } from "./user_profile";

export class QuestionAnswerCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(islandId: string, questionId: string) {
    super();
    this.docRef = doc(
      this.firestore,
      "islands",
      islandId,
      "questions",
      questionId
    );
    this.collectionRef = collection(this.docRef, "answers");
  }

  // answersへの保存処理
  async saveAnswer(answer: string, optionUrl: string, userId: string) {
    try {
      // 参照を追加
      const userRef = doc(this.firestore, "user_profiles", userId);

      // 保存処理
      await addDoc(this.collectionRef, {
        answer: answer,
        option_url: optionUrl,
        liked_count: 0,
        liked_by: [],
        disliked_count: 0,
        disliked_by: [],
        posted_by: userRef,
        posted_at: this.getTimestamp(),
      });

      // 質問の回答数を更新
      await updateDoc(this.docRef, {
        answer_count: increment(1),
      });
    } catch {
      throw new Error("質問の保存に失敗しました");
    }
  }

  // 回答の一覧を取得
  async getAnswers() {
    try {
      const q = query(this.collectionRef, orderBy("liked_count", "desc"));
      const answers = await Promise.all(
        (
          await getDocs(q)
        ).docs.map(async (doc) => {
          const profile = new UserProfileCollection(doc.data().posted_by.id);
          const userProfile = await profile.getProfile();
          return {
            id: doc.id,
            posted_user: {
              name: userProfile?.name,
              image_url: userProfile?.image_url,
            },
            answer: doc.data().answer,
            option_url: doc.data().option_url,
            liked_count: doc.data().liked_count,
            liked_by: doc.data().liked_by,
            disliked_count: doc.data().disliked_count,
            disliked_by: doc.data().disliked_by,
            posted_at: this.convertTimestamp(doc.data().posted_at),
          };
        })
      );

      return answers;
    } catch {
      throw new Error("回答の取得に失敗しました");
    }
  }
}
