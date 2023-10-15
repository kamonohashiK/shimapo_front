import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { searchItems } from "../../_constants/search_items";
import { islandSummaries } from "@/app/_constants/island_summaries";
import { useAppDispatch } from "@/app/_store/hooks";
import { setIslandInfo } from "@/app/_store/slices/pageSlice";
import { getIslandInfo } from "@/app/_api/endpoints/island";
import { useMap } from "@/app/_hooks/map";
import { useAlert } from "@/app/_hooks/alert";

const inputWidth = 400;
const inputPadding = "5px 10px";

const Input = styled("input")(() => ({
  width: inputWidth,
  height: 36,
  padding: inputPadding,
  backgroundColor: "#fff",
  color: "#000",
}));

const Listbox = styled("ul")(() => ({
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
}));

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { setMapInfo } = useMap();
  const { showAlert } = useAlert();
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

        // DBから選択した島の情報を取得
        var dbInfo = await getIslandInfo(selectedIsland.uid);

        //選択した島の情報をstoreに格納
        if (dbInfo.result) {
          dispatch(
            setIslandInfo({
              uid: selectedIsland.uid,
              textHeader: "",
              textBody: "",
              isIslandInfo: true,
              name: selectedIsland.name,
              prefecture: selectedIsland.prefecture,
              city: selectedIsland.city,
              kana: selectedIsland.kana,
              enName: selectedIsland.en_name,
              mainImage: dbInfo.islandInfo?.main_image_url ?? "",
              imageList: dbInfo.imageList ?? [],
              questionList: dbInfo.questionList ?? [],
              focusedQuestionId: "",
              focusedQuestion: "",
            })
          );
        } else {
          showAlert(
            "データ取得に失敗しました。しばらく時間を置いてからお試しください。",
            "error"
          );
        }

        // 検索結果をstoreに格納
        setMapInfo({
          uid: value.uid,
          lat: selectedIsland.lat,
          lng: selectedIsland.lng,
          zoomLevel: 15,
        });
      }
    },
    getOptionLabel: (option) => option.target,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
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
