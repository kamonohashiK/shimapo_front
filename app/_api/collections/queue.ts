import {
  DocumentData,
  addDoc,
  CollectionReference,
  collection,
} from "firebase/firestore";
import { Collection } from "./collection";

export class QueueCollection extends Collection {
  public collectionRef: CollectionReference<any, DocumentData>;

  constructor() {
    super();
    this.collectionRef = collection(this.firestore, "queues");
  }

  // キューを作成する
  async saveQueue(sort: string, props: any) {
    try {
      await addDoc(this.collectionRef, {
        params: props,
        sort: sort,
        expired_at: null,
        is_synced: false,
      });
    } catch {
      throw new Error("キューの保存に失敗しました");
    }
  }
}
