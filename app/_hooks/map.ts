import { setMapInfo as setMapInfoAction } from "@/app/_store/slices/mapSlice";
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

  const setMapInfo = (mapInfo: MapInfoParams) => {
    dispatch(
      setMapInfoAction({
        uid: mapInfo.uid,
        lat: mapInfo.lat,
        lng: mapInfo.lng,
        zoomLevel: mapInfo.zoomLevel,
      })
    );
  };

  return { map, setMapInfo };
};
