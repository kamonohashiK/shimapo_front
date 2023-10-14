import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ActivityList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
                野忽那島(愛媛県松山市): この島へのアクセス方法について教えてください。
              </Typography>
              {" — 質問への回答(一部省略)…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
