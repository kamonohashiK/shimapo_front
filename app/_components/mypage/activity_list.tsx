import * as React from "react";
import List from "@mui/material/List";
import { PostQuestion } from "./activities/post_question";
import { PostImage } from "./activities/post_image";
import { PostAnswer } from "./activities/post_answer";

const activityListItems = [
  { type: "question", content: "質問を投稿しました。" },
  { type: "image", content: "10枚の画像を投稿しました。" },
  { type: "answer", content: "質問に回答しました。" },
];

export default function ActivityList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {activityListItems.map((item, index) => {
        switch (item.type) {
          case "question":
            return <PostQuestion />;
          case "image":
            return <PostImage />;
          case "answer":
            return <PostAnswer />;
          default:
            return <></>;
        }
      })}
    </List>
  );
}

function isLast(index: number, length: number) {
  return index === length - 1;
}
