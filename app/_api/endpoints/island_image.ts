// IslandImage関連のデータを取得するAPI
import { IslandImageCollection } from "../collections/island_image";

// imagesコレクションから画像(サムネイル)のメタデータを取得
export async function getThumbnails(islandId: string) {
  try {
    const islandImage = new IslandImageCollection(islandId);
    const imageList = await islandImage.getThumbnails();

    return imageList;
  } catch (error) {
    return [];
  }
}

// imagesコレクションから画像(大)のメタデータを取得
export async function getLargeImages(islandId: string) {
  try {
    const islandImage = new IslandImageCollection(islandId);
    const imageList = await islandImage.getLargeImages();

    return imageList;
  } catch (error) {
    return [];
  }
}

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
