'use client';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const container = {
  width: "100%",
  height: "800px",
};

const position = {
  lat: 33.975178,
  lng: 132.619553,
};

function getApiKey(): string {
  const value = process.env.GOOGLE_MAP_API_KEY;
  return value !== undefined ? value : "";
}

export default function IslandsMap() {
  return (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={getApiKey()}>
          <GoogleMap
            mapContainerStyle={container}
            center={position}
            zoom={11}
          ></GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}