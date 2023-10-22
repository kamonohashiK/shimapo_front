import { zoomLevel } from "@/app/_constants/zoom_level";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  uid: string;
  zoomLevel: number;
  lat: number;
  lng: number;
  isMap: boolean;
}

const initialState: MapState = {
  uid: "",
  zoomLevel: zoomLevel.DEFAULT,
  lat: 36.975178,
  lng: 135.619553,
  isMap: true,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    // 地図の情報をセット
    setMapInfo: (state, action: PayloadAction<MapState>) => {
      state.uid = action.payload.uid;
      state.zoomLevel = action.payload.zoomLevel;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.isMap = true;
    },
    // 地図の表示・非表示
    setIsMap: (state, action: PayloadAction<boolean>) => {
      state.isMap = action.payload;
    },
  },
});

export const { setMapInfo, setIsMap } = mapSlice.actions;

export default mapSlice.reducer;
