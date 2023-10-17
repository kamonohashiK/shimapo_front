import * as React from "react";
import { useUserProfile } from "@/app/_hooks/user_profile";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { ProgressCircle } from "../../util/progress_circle";
import ReactionList from "./list";

export default function Reaction() {
  // 島の質問一覧を取得
  const [reactionListItems, setReactionListItems] = React.useState<
    {
      id: string;
      island: { name: any; location: any };
      user: { name: any; image_url: any };
      content: any;
      type: any;
      posted_at: any;
    }[]
  >([]);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { getUserReactionsById } = useUserProfile();

  React.useEffect(() => {
    const fetchReactions = async () => {
      const items = await getUserReactionsById(userId);
      if (items.result && items.reactions !== undefined) {
        setReactionListItems(items.reactions);
      }
    };
    fetchReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // TODO: 取得したデータが0件の場合の処理を追加
  return (
    <>
      {reactionListItems != null ? (
        <ReactionList reactionListItems={reactionListItems} />
      ) : (
        <ProgressCircle />
      )}
    </>
  );
}
