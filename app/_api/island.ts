import { IslandCollection } from "./collections/island";
import { IslandImageCollection } from "./collections/island_image";
import { IslandQuestionCollection } from "./collections/question";

// 島の情報を取得
export async function getIslandInfo(islandId: string) {
  try {
    // 島の情報をDBから取得
    const island = new IslandCollection(islandId);
    const islandData = await island.getData();

    // 画像のメタデータを取得
    const islandImage = new IslandImageCollection(islandId);
    const imageList = await islandImage.getThumbnails();

    // 質問を取得
    const islandQuestion = new IslandQuestionCollection(islandId);
    const questionList = await islandQuestion.getQuestionsWithAnswers();

    return {
      result: true,
      islandInfo: islandData,
      imageList: imageList,
      questionList: await Promise.all(questionList),
    };
  } catch (error) {
    return { result: false };
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
