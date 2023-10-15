import { Divider, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export const PostAnswer = () => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="質問に回答しました。"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                野忽那島(愛媛県松山市):
                この島へのアクセス方法について教えてください。
              </Typography>
              {" — 質問への回答(一部省略)…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};
