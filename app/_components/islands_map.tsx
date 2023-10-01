"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import islandSummaries from "../_constants/island_summaries";
import { useAppDispatch } from "../_store/hooks";
import { setIslandInfo } from "../_store/pageSlice";
import React from "react";
import Areas from "../_constants/areas";

const container = {
  width: "100%",
  height: "100vh", //FIXME: ウインドウサイズに合わせたい
};

const defaultPosition = {
  lat: 33.975178,
  lng: 132.619553,
};

const defaultZoomLevel = 5;
const focusedZoomLevel = 14;

const islandPositions = islandSummaries.map((islandSummary) => {
  return {
    uid: islandSummary.uid,
    lat: islandSummary.lat,
    lng: islandSummary.lng,
    prefecture: islandSummary.prefecture,
  };
});

export default function IslandsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const dispatch = useAppDispatch();

  const [markerPosition, setMarkerPosition] = React.useState(defaultPosition);
  const [zoomLevel, setZoomLevel] = React.useState(defaultZoomLevel);

  // マーカークリック時の処理
  function onClickMarker(uid: string) {
    // islandSummariesからuidを元に検索
    var filtered = islandSummaries.filter((item) => item.uid === uid);
    var selectedIsland = filtered[0];

    // 検索結果をstateに格納
    dispatch(
      setIslandInfo({
        uid: uid,
        isIslandInfo: true,
        name: selectedIsland.name,
        prefecture: selectedIsland.prefecture,
        city: selectedIsland.city,
        kana: selectedIsland.kana,
        enName: selectedIsland.en_name,
      })
    );

    // クリックしたピンをマップの中心に表示
    setMarkerPosition({
      lat: selectedIsland.lat,
      lng: selectedIsland.lng,
    });

    // ズームレベルを固定値に変更
    setZoomLevel(focusedZoomLevel);
  }

  return apiKey ? (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={container}
            center={markerPosition}
            zoom={zoomLevel}
          >
            {islandPositions.map((position) => {
              return (
                <Marker
                  key={position.uid}
                  position={position}
                  onClick={() => onClickMarker(position.uid)}
                  icon={{
                    url: getIconUrl(position.prefecture),
                  }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  ) : (
    <></>
  );

  // 地域に対応したアイコンを返す
  function getIconUrl(pref: string) {
    const area = Areas;

    switch (true) {
      case area["HOKKAIDO_TOHOKU"].includes(pref):
        return baseUrl("blue");
      case area["KANTO"].includes(pref):
        return baseUrl("ltblue");
      case area["CHUBU"].includes(pref):
        return baseUrl("green");
      case area["KINKI"].includes(pref):
        return baseUrl("yellow");
      case area["CHUGOKU"].includes(pref):
        return baseUrl("purple");
      case area["SHIKOKU"].includes(pref):
        return baseUrl("pink");
      case area["KYUSHU"].includes(pref):
        return baseUrl("orange");
      case area["OKINAWA"].includes(pref):
        return baseUrl("red");
      default:
        return baseUrl("red");
    }
  }

  // アイコンのベースURLを返す
  function baseUrl(color: string) {
    return `https://maps.google.com/mapfiles/ms/micons/${color}-dot.png`;
  }
}