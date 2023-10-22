import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { searchItems } from "../../_constants/search_items";
import { islandSummaries } from "@/app/_constants/island_summaries";
import { useMap } from "@/app/_hooks/map";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import { zoomLevel } from "@/app/_constants/zoom_level";

const Input = styled("input")(() => ({}));

const Listbox = styled("ul")(() => ({}));

export default function SearchBar() {
  const { setMapInfo } = useMap();
  const { setInfo } = useIslandInfo();

  const isMobile = useSelector((state: RootState) => state.page.isMobile);

  const inputWidth = isMobile ? "75vw" : "40vw";
  const inputPadding = "5px 10px";

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "search-bar",
    options: searchItems,
    blurOnSelect: true,
    clearOnBlur: true,
    onChange: async (event, value) => {
      if (value !== null) {
        // islandSummariesからuidを元に検索
        var filtered = islandSummaries.filter((item) => item.uid === value.uid);
        var selectedIsland = filtered[0];

        // 選択した島の情報を取得
        const uid = selectedIsland.uid;
        setInfo(uid);

        // 検索結果をstoreに格納
        setMapInfo({
          uid: value.uid,
          lat: selectedIsland.lat,
          lng: selectedIsland.lng,
          zoomLevel: zoomLevel.FOCUSED,
        });
      }
    },
    getOptionLabel: (option) => option.target,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Input
          {...getInputProps()}
          sx={{
            width: inputWidth,
            height: 36,
            padding: inputPadding,
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox
          {...getListboxProps()}
          sx={{
            width: inputWidth,
            margin: 0,
            lineHeight: "2em",
            padding: inputPadding,
            zIndex: 1,
            position: "absolute",
            listStyle: "none",
            color: "black",
            backgroundColor: "#fff",
            overflow: "auto",
            maxHeight: 200,
            border: "1px solid rgba(0,0,0,.25)",
            "& li.Mui-focused": {
              backgroundColor: "#4a8df6",
              color: "white",
              cursor: "pointer",
            },
            "& li:active": {
              backgroundColor: "#2977f5",
              color: "white",
            },
          }}
        >
          {(groupedOptions as typeof searchItems).map((option, index) => (
            <li {...getOptionProps({ option, index })} key={option.uid}>
              {option.label}
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
