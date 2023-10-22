import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import { blue } from "@mui/material/colors";
import { textHelper } from "@/app/_utils/text_helper";
import { useIslandInfo } from "@/app/_hooks/island_info";

interface Props {
  index: number;
  content: string;
  island: {
    id: string;
    name: string;
    location: string;
  };
  posted_at: string;
}

export const PostQuestion = (props: Props) => {
  const { trimText } = textHelper();
  const { setInfo } = useIslandInfo();

  function onClick() {
    setInfo(props.island.id);
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[200] }}>
            <IconButton onClick={onClick}>
              <QuestionMarkIcon sx={{ color: blue[600] }} />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
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
