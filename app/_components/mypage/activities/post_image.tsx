import { useIslandInfo } from "@/app/_hooks/island_info";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
  thumbnail_url: string;
  posted_at: string;
}

export const PostImage = (props: Props) => {
  const { setInfo } = useIslandInfo();

  function onClick() {
    setInfo(props.island.id);
  }

  return (
    <>
      <ListItem>
        <ListItemAvatar onClick={onClick}>
          <Avatar
            variant="rounded"
            src={props.thumbnail_url}
            alt="サムネイル"
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.content}
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
