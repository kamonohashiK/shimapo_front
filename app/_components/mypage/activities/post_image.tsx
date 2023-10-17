import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter";
import React from "react";

export const PostImage = () => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="rounded" src="1枚目の画像url" alt="サムネイル" />
        </ListItemAvatar>
        <ListItemText
          primary="10枚の画像を投稿しました。"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                睦月島(愛媛県松山市)
              </Typography>
              {" 投稿日時"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
