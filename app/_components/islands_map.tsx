"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import islandSummaries from "../_constants/island_summaries";
import { useAppDispatch } from "../_store/hooks";
import { setIslandInfo } from "../_store/pageSlice";

const container = {
  width: "100%",
  height: "800px", //FIXME: ウインドウサイズに合わせたい
};

const defaultPosition = {
  lat: 33.975178,
  lng: 132.619553,
};

const islandPositions = islandSummaries.map((islandSummary) => {
  return {
    lat: islandSummary.lat,
    lng: islandSummary.lng,
  };
});

export default function IslandsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const dispatch = useAppDispatch();

  function testFunc() {
    dispatch(setIslandInfo());
  }

  return apiKey ? (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={container}
            center={defaultPosition}
            zoom={11}
          >
            {islandPositions.map((position, index) => {
              return (
                <Marker key={index} position={position} onClick={testFunc} />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  ) : (
    <></>
  );
}