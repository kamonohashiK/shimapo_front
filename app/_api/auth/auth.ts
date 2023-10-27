import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";

/**
 * @name FirebaseAuth
 * @description Firebase Auth APIに関する操作を行うクラス
 * @property {any} auth Firebase Auth APIのインスタンス
 * @constructor auth: Firebase Auth APIのインスタンスを取得
 * */
export class FirebaseAuth {
  public auth: any;

  constructor() {
    this.auth = getAuth(firebase_app);
  }
}
