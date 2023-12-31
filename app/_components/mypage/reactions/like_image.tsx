import { useIslandInfo } from "@/app/_hooks/island_info";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";

interface Props {
  index: number;
  content: string;
  island: {
    id: string;
    name: string;
    location: string;
  };
  user: {
    id: string;
    name: string;
    image_url: string;
  };
  posted_at: string;
}

export const LikeImage = (props: Props) => {
  const { setInfo } = useIslandInfo();

  function onClick() {
    setInfo(props.island.id);
  }

  return (
    <>
      <ListItem alignItems="flex-start" key={props.index}>
        <ListItemAvatar onClick={onClick}>
          <Avatar alt="ユーザー画像" src={props.user.image_url} />
        </ListItemAvatar>
        <ListItemAvatar onClick={onClick}>
          <Avatar variant="rounded" src={props.content} alt="サムネイル" />
        </ListItemAvatar>
        <ListItemText
          primary={props.user.name + "さんがあなたの画像を高評価しました。"}
          secondary={
            <React.Fragment>
              {props.island.name}({props.island.location})
              {" " + props.posted_at}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
