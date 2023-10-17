import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";

export const LikeImage = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemAvatar>
          <Avatar variant="rounded" src="1枚目の画像url" alt="サムネイル" />
        </ListItemAvatar>
        <ListItemText
          primary="{ユーザー名} さんがあなたの画像を高評価しました。"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                中島(愛媛県松山市)
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
