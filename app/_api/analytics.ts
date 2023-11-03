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
    if (isError) {
      this.log("get_island_info_error", {
        islandId: islandId,
        error: error_message,
      });
    } else {
      this.log("get_island_info", { islandId: islandId });
    }
  }
}
