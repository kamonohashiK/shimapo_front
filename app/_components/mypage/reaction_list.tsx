import * as React from "react";
import List from "@mui/material/List";
import { LikeImage } from "./reactions/like_image";
import { AnswerQuestion } from "./reactions/answer_question";
import { LikeAnswer } from "./reactions/like_answet";

const reactionListItems = [
  { type: "like_image", content: "あなたの画像を高評価しました。" },
  { type: "answer_question", content: "あなたの質問に回答しました。" },
  { type: "like_answer", content: "あなたの回答を高評価しました。" },
];

export default function ReactionList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
