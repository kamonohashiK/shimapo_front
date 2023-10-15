import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  uid: string;
  zoomLevel: number;
  lat: number;
  lng: number;
}

const initialState: MapState = {
  uid: "",
  zoomLevel: 5,
  lat: 36.975178,
  lng: 135.619553,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapInfo: (state, action: PayloadAction<MapState>) => {
      state.uid = action.payload.uid;
      state.zoomLevel = action.payload.zoomLevel;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    }
  },
});

export const { setMapInfo } = mapSlice.actions;

export default mapSlice.reducer;
