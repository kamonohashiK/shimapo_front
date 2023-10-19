import {
  setMapInfo as setMapInfoAction,
  setIsMap as setIsMapAction,
} from "@/app/_store/slices/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";

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

  return { map, setMapInfo, setIsMap };
};
