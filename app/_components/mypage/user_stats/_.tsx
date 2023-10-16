import { UserStatsList } from "./list";
import { ProgressCircle } from "../../util/progress_circle";
import { useUserProfile } from "@/app/_hooks/user_profile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_store/store";

export const UserStats = () => {
  const [statsData, setStatsData] = useState<any[]>([]);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { getUserProfileById } = useUserProfile();

  // マウント時にプロフィールを取得
  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await getUserProfileById(userId);
      if (result) {
        setStatsData([
          { title: "画像投稿数", value: result.posted_images },
          { title: "画像への高評価", value: result.liked_images },
          { title: "質問数", value: result.posted_questions },
          { title: "回答数", value: result.posted_answers },
          { title: "回答への高評価", value: result.liked_answers },
        ]);
      } else {
        // TODO: 取得エラー時の処理
      }
    };
    fetchQuestions();
    // NOTE: ここで自身を依存配列に入れると無限ループになる
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return statsData.length > 0 ? (
    <UserStatsList statsData={statsData} />
  ) : (
    <ProgressCircle />
  );
};
