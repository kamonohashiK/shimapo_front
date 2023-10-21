import {
  setMapInfo as setMapInfoAction,
  setIsMap as setIsMapAction,
} from "@/app/_store/slices/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";
import { getLargeImages as getLargeImagesAction } from "../_api/endpoints/island_image";
import { UserReactionCollection } from "../_api/collections/user_reaction";
import { notificationTypes } from "../_constants/notification_types";
import { UserProfileCollection } from "../_api/collections/user_profile";
import { IslandImageCollection } from "../_api/collections/island_image";

interface MapInfoParams {
  uid: string;
  lat: number;
  lng: number;
  zoomLevel: number;
}

export const useMap = () => {
  const dispatch = useDispatch();
  const map = useSelector((state: RootState) => state.map);

  // 地図の情報をセットするフック
  const setMapInfo = (mapInfo: MapInfoParams) => {
    dispatch(
      setMapInfoAction({
        uid: mapInfo.uid,
        lat: mapInfo.lat,
        lng: mapInfo.lng,
        zoomLevel: mapInfo.zoomLevel,
        isMap: true,
      })
    );
  };

  // 地図の表示・非表示をセットするフック
  const setIsMap = (isMap: boolean) => {
    dispatch(setIsMapAction(isMap));
  };

  // 画像一覧(大)を取得して返す
  const getLargeImages = async (islandId: string) => {
    const data = await getLargeImagesAction(islandId);
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  };

  // 画像高評価時に呼び出すフック
  const likeImage = async (
    islandId: string,
    imageId: string,
    userId: string,
    imageUrl: string,
    isLiked: boolean
  ) => {
    try {
      // コレクションの初期化
      const image = new IslandImageCollection(islandId);

      // 画像のデータから投稿したユーザーのIDを取得
      const postedUserId = await image.getPostedUserId(imageId);
      const profile = new UserProfileCollection(postedUserId);

      // 画像データのliked_byへユーザーIDを追加or削除: OK
      const saveImageData = await image.updateLikedBy(imageId, userId);

      // 画像を投稿したユーザーの「画像への高評価」を更新
      const saveEvaluate = await profile.updateLikedImages(isLiked);

      // 画像を投稿したユーザー向けにリアクションを追加
      const reaction = new UserReactionCollection(postedUserId);
      // サムネイルのURLを取得する
      const thumbnailUrl = encodeAndReplace(imageUrl);
      const saveReaction = isLiked
        ? await reaction.SaveReaction(
            userId,
            islandId,
            notificationTypes.LIKE_IMAGE,
            thumbnailUrl
          )
        : null;

      return Promise.resolve([saveImageData, saveEvaluate, saveReaction]);
    } catch (error) {
      return false;
    }
  };

  return { map, setMapInfo, setIsMap, getLargeImages, likeImage };
};

// 画像URLの"large"を"thumbnail"に置き換える
function encodeAndReplace(url: string): string {
  // URLをエンコード
  const encodedUrl = encodeURIComponent(url);

  const target = "large";
  const replacement = "thumbnail";
  const replacedUrl = encodedUrl.replace(target, replacement);

  // エンコードされたURLをデコードして返す
  return decodeURIComponent(replacedUrl);
}
