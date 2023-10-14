import { Divider, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export const PostQuestion = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="質問を投稿しました。"
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
              {" - 質問内容"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
