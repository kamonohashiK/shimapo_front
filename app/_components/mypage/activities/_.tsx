import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_store/store";
import { useUserProfile } from "@/app/_hooks/user_profile";
import { ActivityList } from "./list";
import { ProgressCircle } from "../../util/progress_circle";

export default function Activities() {
  // 島の質問一覧を取得
  const [activityListItems, setActivityListItems] = useState<
    {
      id: string;
      island: { name: any; location: any };
      content: any;
      type: any;
      posted_at: any;
      thumbnail_url: any;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { getUserActivitiesById } = useUserProfile();

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      await getUserActivitiesById(userId).then((res) => {
        if (res.result && res.activities !== undefined) {
          setActivityListItems(res.activities);
        }
        setIsLoading(false);
      });
    };
    fetchActivities();
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <ProgressCircle />
      ) : (
        <ActivityList activityListItems={activityListItems} />
      )}
    </>
  );
}

function isLast(index: number, length: number) {
  return index === length - 1;
}
