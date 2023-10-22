import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  orderBy,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { Collection } from "./collection";
import { QuestionAnswerCollection } from "./question_answer";

export class IslandQuestionCollection extends Collection {
  private islandId: string;
  public docRef: DocumentReference<DocumentData, DocumentData>;
  public collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(islandId: string) {
    super();
    this.islandId = islandId;
    this.docRef = doc(this.firestore, "islands", islandId);
    this.collectionRef = collection(this.docRef, "questions");
  }

  // 島ごとの質問を取得する
  async getQuestions() {
    const q = query(this.collectionRef, orderBy("posted_at", "asc"));
    const questions = await getDocs(q);
    return questions;
  }

  // 島ごとの質問と回答を取得する
  async getQuestionsWithAnswers() {
    const questions = await this.getQuestions();
    const questionList = questions.docs.map(async (doc) => {
      const questionAnswerCollection = new QuestionAnswerCollection(
        this.islandId,
        doc.id
      );
      return {
        id: doc.id,
        question: doc.data().question,
        answer_count: doc.data().answer_count,
        is_default: doc.data().is_default,
        posted_at: this.convertTimestamp(doc.data().posted_at),
        answers: await questionAnswerCollection.getAnswers(),
      };
    });

    return await Promise.all(questionList);
  }

  // 質問を新規作成する
  async SaveQuestion(userId: string, question: string) {
    try {
      // 参照を追加
      const userRef = doc(this.firestore, "user_profiles", userId);

      // 保存処理
      await addDoc(this.collectionRef, {
        posted_at: this.getTimestamp(),
        question: question,
        posted_by: userRef,
        is_default: false,
        answer_count: 0,
      });
    } catch {
      throw new Error("質問の保存に失敗しました");
    }
  }
}
