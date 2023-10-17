import * as React from "react";
import List from "@mui/material/List";
import { LikeImage } from "./like_image";
import { AnswerQuestion } from "./answer_question";
import { LikeAnswer } from "./like_answer";

const reactionListItems = [
  {
    type: "like_image",
    content: "画像url",
    island: { id: "hoge", name: "釣島", location: "愛媛県松山市" },
    user: { id: "fuga", name: "釣り太郎", image_url: "ユーザー画像url" },
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
  {
    type: "answer_question",
    content: "質問:回答(合計40字以内)",
    island: { id: "hoge", name: "釣島", location: "愛媛県松山市" },
    user: { id: "fuga", name: "釣り太郎", image_url: "ユーザー画像url" },
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
  {
    type: "like_answer",
    content: "質問:回答(合計40字以内)",
    island: { id: "hoge", name: "釣島", location: "愛媛県松山市" },
    user: { id: "fuga", name: "釣り太郎", image_url: "ユーザー画像url" },
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
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
            return (
              <LikeImage
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
                }}
                user={{
                  id: item.user.id ?? "",
                  name: item.user.name ?? "",
                  image_url: item.user.image_url ?? "",
                }}
                posted_at={item.posted_at ?? ""}
              />
            );
          case "answer_question":
            return (
              <AnswerQuestion
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
                }}
                user={{
                  id: item.user.id ?? "",
                  name: item.user.name ?? "",
                  image_url: item.user.image_url ?? "",
                }}
                posted_at={item.posted_at ?? ""}
              />
            );
          case "like_answer":
            return (
              <LikeAnswer
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
                }}
                user={{
                  id: item.user.id ?? "",
                  name: item.user.name ?? "",
                  image_url: item.user.image_url ?? "",
                }}
                posted_at={item.posted_at ?? ""}
              />
            );
          default:
            return <></>;
        }
      })}
    </List>
  );
}
