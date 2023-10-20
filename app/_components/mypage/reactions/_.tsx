import { useEffect, useState } from "react";
import { useUserProfile } from "@/app/_hooks/user_profile";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { ProgressCircle } from "../../util/progress_circle";
import ReactionList from "./list";

export default function Reaction() {
  // 島の質問一覧を取得
  const [reactionListItems, setReactionListItems] = useState<
    {
      id: string;
      island: { name: any; location: any };
      user: { name: any; image_url: any };
      content: any;
      type: any;
      posted_at: any;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { getUserReactionsById } = useUserProfile();

  useEffect(() => {
    const fetchReactions = async () => {
      setIsLoading(true);
      await getUserReactionsById(userId).then((res) => {
        if (res.result && res.reactions !== undefined) {
          setReactionListItems(res.reactions);
        }
        setIsLoading(false);
      });
    };
    fetchReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <ProgressCircle />
      ) : (
        <ReactionList reactionListItems={reactionListItems} />
      )}
    </>
  );
}
