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
import { trimText } from "@/app/_utils/text";

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
  return (
    <>
      <ListItem alignItems="flex-start" key={props.index}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: lightGreen[100] }}>
            <IconButton>
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
