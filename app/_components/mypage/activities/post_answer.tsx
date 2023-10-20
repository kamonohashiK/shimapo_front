import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React from "react";
import { lightGreen } from "@mui/material/colors";
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

export const PostAnswer = (props: Props) => {
  const { trimText } = textHelper();
  const { setInfo } = useIslandInfo();

  function onClick() {
    setInfo(props.island.id);
  }

  return (
    <>
      <ListItem alignItems="flex-start" key={props.index}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: lightGreen[100] }}>
            <IconButton onClick={onClick}>
              <QuestionAnswerIcon sx={{ color: lightGreen[600] }} />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
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
