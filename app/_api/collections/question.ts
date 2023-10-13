import {
  DocumentReference,
  DocumentData,
  CollectionReference,
  doc,
  collection,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { Collection } from "./collection";
import { getAnswers } from "../question";

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
    const q = query(
      collection(this.docRef, "questions"),
      orderBy("posted_at", "desc")
    );
    const questions = await getDocs(q);
    return questions;
  }

  // 島ごとの質問と回答を取得する
  async getQuestionsWithAnswers() {
    const questions = await this.getQuestions();
    const questionList = questions.docs.map(async (doc) => ({
      id: doc.id,
      question: doc.data().question,
      answer_count: doc.data().answer_count,
      is_default: doc.data().is_default,
      posted_at: this.convertTimestamp(doc.data().posted_at),
      answers: await getAnswers(this.islandId, doc.id),
    }));

    return await Promise.all(questionList);
  }
}
