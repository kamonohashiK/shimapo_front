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

const testIslandPositions = [
  { lat: 33.975178, lng: 132.619553 },
  { lat: 33.980306, lng: 132.548509 },
  { lat: 33.969383, lng: 132.689278 },
  { lat: 33.883688, lng: 132.673384 },
  { lat: 33.964277, lng: 132.661154 },
];

export default function IslandsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  function testFunc() {
    console.log("test");
  }

  return apiKey ? (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={container} center={position} zoom={11}>
            {testIslandPositions.map((position, index) => {
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