// IslandImage関連のデータを取得するAPI

import { IslandImageCollection } from "../collections/island_image";

// 画像URLを保存
export async function saveImageUrl(
  islandId: string,
  userId: string,
  url: string,
  type: string
) {
  try {
    // imagesコレクションに画像のメタデータを保存
    const islandImage = new IslandImageCollection(islandId);
    await islandImage.saveImageMetadata(url, type, userId);

    return true;
  } catch (error) {
    return false;
  }
}
