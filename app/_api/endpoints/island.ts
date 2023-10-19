import { IslandCollection } from "../collections/island";
import { IslandImageCollection } from "../collections/island_image";
import { IslandQuestionCollection } from "../collections/island_question";

// 島の情報を取得
export async function getIslandInfo(islandId: string) {
  try {
    // 島の情報をDBから取得
    const island = new IslandCollection(islandId);
    const islandData = await island.getData();

    return {
      result: true,
      islandInfo: islandData,
    };
  } catch (error) {
    return { result: false };
  }
}
