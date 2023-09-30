"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import islandSummaries from "../_constants/island_summaries";
import { useAppDispatch } from "../_store/hooks";
import { setIslandInfo } from "../_store/pageSlice";
import React from "react";

const container = {
  width: "100%",
  height: "800px", //FIXME: ウインドウサイズに合わせたい
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
    const hokkaidoTohoku = ["北海道", "山形県", "宮城県"];
    const kanto = ["東京都", "神奈川県", "千葉県"];
    const chubu = ["愛知県", "静岡県", "三重県", "新潟県", "石川県"];
    const kinki = ["滋賀県", "兵庫県", "和歌山県"];
    const chugoku = ["岡山県", "島根県", "広島県", "山口県"];
    const shikoku = ["香川県", "愛媛県", "高知県", "徳島県"];
    const kyushu = ["福岡県", "長崎県", "鹿児島県", "熊本県", "宮崎県", "佐賀県", "大分県"];

    switch (true) {
      case hokkaidoTohoku.includes(pref):
        return baseUrl("blue");
      case kanto.includes(pref):
        return baseUrl("ltblue");
      case chubu.includes(pref):
        return baseUrl("green");
      case kinki.includes(pref):
        return baseUrl("yellow");
      case chugoku.includes(pref):
        return baseUrl("purple");
      case shikoku.includes(pref):
        return baseUrl("pink");
      case kyushu.includes(pref):
        return baseUrl("orange");
      default:
        return baseUrl("red");
    }
  }

  // アイコンのベースURLを返す
  function baseUrl(color: string) {
    return `https://maps.google.com/mapfiles/ms/micons/${color}-dot.png`;
  }
}