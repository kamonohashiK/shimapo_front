import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
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
  return (
    <>
      <ListItem alignItems="flex-start" key={props.index}>
        <ListItemAvatar>
          <Avatar alt="ユーザー画像" src={props.user.image_url} />
        </ListItemAvatar>
        <ListItemAvatar>
          <Avatar variant="rounded" src={props.content} alt="サムネイル" />
        </ListItemAvatar>
        <ListItemText
          primary={props.user.name + "さんがあなたの画像を高評価しました。"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.island.name}({props.island.location})
              </Typography>
              {" " + props.posted_at}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
