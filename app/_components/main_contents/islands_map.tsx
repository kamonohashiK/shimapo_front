"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { islandSummaries } from "../../_constants/island_summaries";
import React from "react";
import Areas from "../../_constants/areas";
import { useSelector } from "react-redux";
import { RootState } from "../../_store/store";
import { useMap } from "@/app/_hooks/map";
import { useIslandInfo } from "@/app/_hooks/island_info";

const container = {
  width: "100%",
  height: "100vh",
};

const focusedZoomLevel = 14;

const islandPositions = islandSummaries.map((islandSummary) => {
  return {
    uid: islandSummary.uid,
    lat: islandSummary.lat,
    lng: islandSummary.lng,
    prefecture: islandSummary.prefecture,
  };
});

export default function IslandsMap(props: { apiKey: string | undefined }) {
  const apiKey = props.apiKey;
  const mapInfo = useSelector((state: RootState) => state.map);
  const { setMapInfo } = useMap();
  const { setInfo } = useIslandInfo();

  // マーカークリック時の処理
  async function onClickMarker(uid: string) {
    // islandSummariesからuidを元に検索
    var filtered = islandSummaries.filter((item) => item.uid === uid);
    var selectedIsland = filtered[0];

    // uidを元に島の情報を取得
    setInfo(uid);

    // マップの状態をstoreに反映
    setMapInfo({
      uid: uid,
      lat: selectedIsland.lat,
      lng: selectedIsland.lng,
      zoomLevel: focusedZoomLevel,
    });
  }

  return apiKey ? (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={container}
            center={{ lat: mapInfo.lat, lng: mapInfo.lng }}
            zoom={mapInfo.zoomLevel}
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
