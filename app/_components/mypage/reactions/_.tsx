import * as React from "react";
import List from "@mui/material/List";
import { LikeImage } from "./like_image";
import { AnswerQuestion } from "./answer_question";
import { LikeAnswer } from "./like_answer";

const reactionListItems = [
  { type: "like_image", content: "あなたの画像を高評価しました。" },
  { type: "answer_question", content: "あなたの質問に回答しました。" },
  { type: "like_answer", content: "あなたの回答を高評価しました。" },
];

export default function ReactionList() {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: "50vh",
        overflow: "auto",
      }}
    >
      {reactionListItems.map((item, index) => {
        switch (item.type) {
          case "like_image":
            return <LikeImage />;
          case "answer_question":
            return <AnswerQuestion />;
          case "like_answer":
            return <LikeAnswer />;
          default:
            return <></>;
        }
      })}
    </List>
  );
}
