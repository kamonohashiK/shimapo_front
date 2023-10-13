import { db } from "@/firebase/config";
import { Firestore } from "firebase/firestore";

export class Collection {
  public firestore: Firestore;

  constructor() {
    this.firestore = db;
  }
}
