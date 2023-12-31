"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { islandSummaries } from "../../_constants/island_summaries";
import React, { useEffect, useState } from "react";
import Areas from "../../_constants/areas";
import { useSelector } from "react-redux";
import { RootState } from "../../_store/store";
import { useMap } from "@/app/_hooks/map";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { Box, Stack } from "@mui/material";
import { UnderDrawer } from "../under_drawer/_";
import { zoomLevel } from "@/app/_constants/zoom_level";

const islandPositions = islandSummaries.map((islandSummary) => {
  return {
    uid: islandSummary.uid,
    lat: islandSummary.lat,
    lng: islandSummary.lng,
    prefecture: islandSummary.prefecture,
  };
});

interface Props {
  apiKey: string | undefined;
  isMobile: boolean;
}

export default function IslandsMap(props: Props) {
  const apiKey = props.apiKey;
  const mapInfo = useSelector((state: RootState) => state.map);
  const { setMapInfo } = useMap();
  const { setInfo } = useIslandInfo();

  const containerHeight = props.isMobile
    ? "calc(100vh - 60px - 112px)"
    : "calc(100vh - 60px)"; // 60p : "calc(100vh - 60px)"; // 60px: header
  const [stackHeight, setStackHeight] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setStackHeight(window.innerHeight);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      zoomLevel: zoomLevel.FOCUSED,
    });
  }

  return apiKey ? (
    <Stack sx={{ height: stackHeight }}>
      <Box height={60} />
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: containerHeight,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
          center={{ lat: mapInfo.lat, lng: mapInfo.lng }}
          zoom={mapInfo.zoomLevel}
          options={{
            gestureHandling: props.isMobile ? "greedy" : "cooperative",
          }}
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
      {props.isMobile ? <UnderDrawer /> : <></>}
    </Stack>
  ) : (
    <></>
  );

  // 地域に対応したアイコンを返す
  function getIconUrl(pref: string) {
    const area = Areas;

    switch (true) {
      case area.HOKKAIDO_TOHOKU.includes(pref):
        return baseUrl("blue");
      case area.KANTO.includes(pref):
        return baseUrl("ltblue");
      case area.CHUBU.includes(pref):
        return baseUrl("green");
      case area.KINKI.includes(pref):
        return baseUrl("yellow");
      case area.CHUGOKU.includes(pref):
        return baseUrl("purple");
      case area.SHIKOKU.includes(pref):
        return baseUrl("pink");
      case area.KYUSHU.includes(pref):
        return baseUrl("orange");
      case area.OKINAWA.includes(pref):
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
