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

  // 画像のメタデータを取得した際のイベント
  logGetImageMetadata(
    islandId: string,
    sort: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_image_metadata_error" : "get_image_metadata";
    const params = isError
      ? { islandId, sort, error: error_message }
      : { islandId, sort };
    this.log(event, params);
  }

  // 画像のメタデータを保存した際のイベント
  logSaveImageMetadata(
    islandId: string,
    sort: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "save_image_metadata_error" : "save_image_metadata";
    const params = isError
      ? { islandId, sort, error: error_message }
      : { islandId, sort };
    this.log(event, params);
  }

  // 質問を取得した際のイベント
  logGetQuestions(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_questions_error" : "get_questions";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }

  // 質問を投稿した際のイベント
  logCreateQuestion(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "create_question_error" : "create_question";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }

  // 質問を取得した際のイベント
  logGetAnswers(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_answers_error" : "get_answers";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }

  // 質問に回答した際のイベント
  logAnswerQuestion(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "answer_question_error" : "answer_question";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }

  // 回答に評価をつけた際のイベント
  logEvaluateAnswer(
    islandId: string,
    questionId: string,
    liked: boolean,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "evaluate_question_error" : "evaluate_question";
    const params = isError
      ? { islandId, questionId, liked, error: error_message }
      : { islandId, questionId, liked };
    this.log(event, params);
  }

  // リアクション作成時のイベント
  logCreateReaction(
    islandId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "create_reaction_error" : "create_reaction";
    const params = isError ? { islandId, error: error_message } : { islandId };
    this.log(event, params);
  }

  // アクティビティを取得した際のイベント
  logGetActivities(
    userId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_activities_error" : "get_activities";
    const params = isError ? { userId, error: error_message } : { userId };
    this.log(event, params);
  }

  // リアクションを取得した際のイベント
  logGetReactions(
    userId: string,
    isError: boolean = false,
    error_message: string = ""
  ) {
    const event = isError ? "get_reactions_error" : "get_reactions";
    const params = isError ? { userId, error: error_message } : { userId };
    this.log(event, params);
  }
}
