import {
  setMapInfo as setMapInfoAction,
  setIsMap as setIsMapAction,
} from "@/app/_store/slices/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";
import { getLargeImages as getLargeImagesAction } from "../_api/endpoints/island_image";

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

  return { map, setMapInfo, setIsMap, getLargeImages };
};
