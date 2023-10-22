import { useSelector } from "react-redux";
import { RootState } from "@/app/_store/store";
import React, { useEffect } from "react";
import { ProgressCircle } from "../../../util/progress_circle";
import { QuestionListItems } from "./list";
import { useIslandInfo } from "@/app/_hooks/island_info";

export default function UnderDrawerQuestionList() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const islandId = useSelector((state: RootState) => state.page.uid);
  const questions = useSelector((state: RootState) => state.page.questionList);
  const { setQuestionList } = useIslandInfo();

  // 島の質問一覧を取得
  useEffect(() => {
    const fetchQuestions = async () => {
      await setQuestionList(islandId);
    };
    fetchQuestions();
    // NOTE: ここで自身を依存配列に入れると無限ループになる
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandId]);

  return (
    <>
      {questions != null ? (
        <QuestionListItems
          questions={questions}
          userId={userId}
          islandId={islandId}
        />
      ) : (
        <ProgressCircle />
      )}
    </>
  );
}
