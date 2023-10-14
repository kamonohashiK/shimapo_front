import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ReactionList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemAvatar>
          <img src="" alt="img" />
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
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="{ユーザー名} さんがあなたの質問に回答しました。"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                大島(愛媛県今治市): 質問内容
              </Typography>
              {" — 回答内容(省略なし)"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="{ユーザー名} さんがあなたの回答を高評価しました。"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                大島(愛媛県八幡浜市): 質問内容
              </Typography>
              {" — 回答内容(省略あり)"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
