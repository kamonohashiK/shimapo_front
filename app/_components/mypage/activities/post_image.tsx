import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

export const PostImage = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img src="" alt="img" />
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
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
