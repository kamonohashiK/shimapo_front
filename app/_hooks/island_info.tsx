import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";
import {
  setIslandInfo,
  setQuestionList as setQuestionListAction,
} from "../_store/pageSlice";
import { getIslandInfo } from "../_api/endpoints/island";
import islandSummaries from "../_constants/island_summaries";
import { getQuestions } from "../_api/question";

export const useIslandInfo = () => {
  const dispatch = useDispatch();
  const islandInfo = useSelector((state: RootState) => state.page);

  // 島の情報を取得してストアに保存
  const setInfo = async (islandId: string) => {
    var filtered = islandSummaries.filter((item) => item.uid === islandId);
    var selectedIsland = filtered[0];
    // APIから選択した島の情報を取得
    const data = await getIslandInfo(islandId);
    if (data.result) {
      dispatch(
        setIslandInfo({
          uid: islandId,
          textHeader: "",
          textBody: "",
          isIslandInfo: true,
          name: selectedIsland.name,
          prefecture: selectedIsland.prefecture,
          city: selectedIsland.city,
          kana: selectedIsland.kana,
          enName: selectedIsland.en_name,
          mainImage: data.islandInfo?.main_image_url ?? "",
          imageList: data.imageList,
          questionList: data.questionList ?? [],
          focusedQuestionId: "",
          focusedQuestion: "",
        })
      );
    } else {
      dispatch(
        setIslandInfo({
          uid: "",
          textHeader: "データ取得に失敗しました。",
          textBody: "しばらく時間を置いてからお試しください。",
          isIslandInfo: false,
          name: "",
          prefecture: "",
          city: "",
          kana: "",
          enName: "",
          mainImage: "",
          imageList: [],
          questionList: [],
          focusedQuestionId: "",
          focusedQuestion: "",
        })
      );
    }
  };

  // 質問一覧を取得してストアに保存
  const setQuestionList = async (islandId: string) => {
    const data = await getQuestions(islandId);
    if (data.length > 0) {
      dispatch(setQuestionListAction(data));
    }
  };

  return { islandInfo, setInfo, setQuestionList };
};
