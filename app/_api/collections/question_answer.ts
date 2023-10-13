import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  addDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Collection } from "./collection";

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
}
