import { FirebaseAnalytics } from "../analytics";
import { IslandCollection } from "../collections/island";

const analytics = new FirebaseAnalytics();

// 島の情報を取得
export async function getIslandInfo(islandId: string) {
  try {
    // 島の情報をDBから取得
    const island = new IslandCollection(islandId);
    const islandData = await island.getData();
    analytics.logGetIslandInfo(islandId);

    return {
      result: true,
      islandInfo: islandData,
    };
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "unknown error";
    analytics.logGetIslandInfo(islandId, true, errorMessage);

    return { result: false };
  }
}
