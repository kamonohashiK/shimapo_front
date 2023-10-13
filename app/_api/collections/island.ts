import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from "firebase/firestore";
import { Collection } from "./collection";

export class IslandCollection extends Collection {
  public docRef: DocumentReference<DocumentData, DocumentData>;

  constructor(islandId: string) {
    super();
    this.docRef = doc(this.firestore, "islands", islandId);
  }

  // スナップショットを取得する
  async getSnapshot() {
    return await getDoc(this.docRef);
  }

  // データを取得する
  async getData() {
    return (await getDoc(this.docRef)).data();
  }
}
