'use client';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const container = {
  width: "100%",
  height: "800px", //FIXME: ウインドウサイズに合わせたい
};

const position = {
  lat: 33.975178,
  lng: 132.619553,
};

const testIslandPosition = {
  lat: 33.975178,
  lng: 132.619553,
};

export default function IslandsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  return apiKey ? (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={container} center={position} zoom={11}>
            <Marker position={testIslandPosition} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  ) : (
    <></>
  );
}