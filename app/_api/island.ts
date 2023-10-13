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
