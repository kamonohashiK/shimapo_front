import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";

// Firebase Authenticationのインスタンスを生成する
export class FirebaseAuth {
  public auth: any;

  constructor() {
    this.auth = getAuth(firebase_app);
  }
}
