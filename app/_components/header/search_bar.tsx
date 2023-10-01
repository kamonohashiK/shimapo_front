import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { searchItems } from "../../_constants/search_items";

const inputWidth = 400;
const inputPadding = "5px 10px";

const Input = styled("input")(() => ({
  width: inputWidth,
  height: 36,
  padding: inputPadding,
  backgroundColor: "#fff",
  color: "#000",
}));
//TODO: 入力内容をクリアするボタンを追加したい

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
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: searchItems,
    getOptionLabel: (option) => option.target,
    //TODO: 選択後に入力フォームに残り文字列をLabelにしたい
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


