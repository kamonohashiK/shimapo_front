import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase Analyticsを使用するクラス
export class FirebaseAnalytics {
  analytics;

  constructor() {
    this.analytics = getAnalytics();
  }

  // ログイベントを送信する
  log(event: string, params: any = {}) {
    logEvent(this.analytics, event, params);
  }

  // 島の情報にアクセスした際のイベント
  logGetIslandInfo(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_island_info_error" : "get_island_info";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }
}
