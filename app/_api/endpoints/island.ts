import { FirebaseAnalytics } from "../analytics";
import { IslandCollection } from "../collections/island";

// 島の情報を取得
export async function getIslandInfo(islandId: string) {
  const analytics = new FirebaseAnalytics();
  try {
    // 島の情報をDBから取得
    const island = new IslandCollection(islandId);
    const islandData = await island.getData();
    analytics.log("get_island_info", { islandId: islandId });

    return {
      result: true,
      islandInfo: islandData,
    };
  } catch (error) {
    analytics.log("get_island_info_error", {
      islandId: islandId,
      error: error,
    });
    return { result: false };
  }
}
