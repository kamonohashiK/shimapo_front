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
    uid: islandSummary.uid,
    lat: islandSummary.lat,
    lng: islandSummary.lng,
  };
});

export default function IslandsMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const dispatch = useAppDispatch();

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
            {islandPositions.map((position) => {
              return (
                <Marker
                  key={position.uid}
                  position={position}
                  onClick={() => onClickMarker(position.uid)}
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
}