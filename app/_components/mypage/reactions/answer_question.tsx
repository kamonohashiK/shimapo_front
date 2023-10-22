import { useIslandInfo } from "@/app/_hooks/island_info";
import { textHelper } from "@/app/_utils/text_helper";
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

export const AnswerQuestion = (props: Props) => {
  const { trimText } = textHelper();
  const { setInfo } = useIslandInfo();

  function onClick() {
    setInfo(props.island.id);
  }

  return (
    <>
      <ListItem alignItems="flex-start" key={props.index}>
        <ListItemAvatar onClick={onClick}>
          <Avatar alt="ユーザー画像" src={props.user.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={props.user.name + " さんがあなたの質問に回答しました。"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {trimText(props.content)}
                <br></br>
              </Typography>
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
