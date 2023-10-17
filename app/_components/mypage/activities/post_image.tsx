import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
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
  return (
    <>
      <ListItem>
        <ListItemAvatar>
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
