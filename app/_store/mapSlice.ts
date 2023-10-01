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
  reducers: {},
});

export const { } = mapSlice.actions;

export default mapSlice.reducer;
