import { db } from "@/firebase/config";
import { Firestore, Timestamp } from "firebase/firestore";

export class Collection {
  public firestore: Firestore;

  constructor() {
    this.firestore = db;
  }

  // Timestamp型を日本語の日付表記に変換する
  convertTimestamp(t: any) {
    try {
      return t.toDate().toLocaleString("ja-JP");
    } catch (error) {
      return "";
    }
  }

  // 現在のタイムスタンプを取得する
  getTimestamp() {
    return Timestamp.fromDate(new Date());
  }
}
