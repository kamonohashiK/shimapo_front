'use client';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import islandSummaries from "../constants/island_summaries";

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

  function testFunc() {
    console.log("test");
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