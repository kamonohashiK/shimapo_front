import { FirebaseAnalytics } from "../analytics";
import { IslandCollection } from "../collections/island";

// 島の情報を取得
export async function getIslandInfo(islandId: string) {
  const analytics = new FirebaseAnalytics();
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
    analytics.logGetIslandInfo(islandId, true, error.message);
    return { result: false };
  }
}
