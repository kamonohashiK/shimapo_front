import { IslandThumbnailList } from "./list";
import { ProgressCircle } from "@/app/_components/util/progress_circle";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_store/store";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { useEffect } from "react";

export default function ThumbnailList() {
  const islandId = useSelector((state: RootState) => state.page.uid);
  const thumbnails = useSelector(
    (state: RootState) => state.page.thumbnailList
  );

  const { setThumbnailList } = useIslandInfo();

  // 島の画像サムネイル一覧を取得
  useEffect(() => {
    const fetchThumbnails = async () => {
      await setThumbnailList(islandId);
    };
    fetchThumbnails();
    // NOTE: ここで自身を依存配列に入れると無限ループになる
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandId]);

  return (
    <>
      {thumbnails != null ? (
        <IslandThumbnailList thumbnails={thumbnails} />
      ) : (
        <ProgressCircle />
      )}
    </>
  );
}
