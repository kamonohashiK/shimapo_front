import * as React from "react";
import List from "@mui/material/List";
import { PostQuestion } from "./post_question";
import { PostImage } from "./post_image";
import { PostAnswer } from "./post_answer";
import { notificationTypes } from "@/app/_constants/notification_types";

const activityListItems = [
  {
    type: "image",
    content: "10枚の画像を投稿しました。",
    island: {
      id: "fuga",
      name: "大根島",
      location: "島根県松江市",
    },
    thumbnail_url: "1枚目の画像url",
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
  {
    type: "question",
    content: "質問(40文字以内)",
    island: {
      id: "fuga",
      name: "姫島",
      location: "大分県姫島村",
    },
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
  {
    type: "answer",
    content: "質問と回答(40文字以内)",
    island: {
      id: "hoge",
      name: "中島",
      location: "愛媛県松山市",
    },
    posted_at: "YYYY年MM月DD日 10:00:00",
  },
];

export default function ActivityList() {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: "50vh",
        overflow: "auto",
      }}
    >
      {activityListItems.map((item, index) => {
        switch (item.type) {
          case notificationTypes.QUESTION:
            return (
              <PostQuestion
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
                }}
                posted_at={item.posted_at ?? ""}
              />
            );
          case notificationTypes.IMAGE:
            return (
              <PostImage
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
                }}
                thumbnail_url={item.thumbnail_url ?? ""}
                posted_at={item.posted_at ?? ""}
              />
            );
          case notificationTypes.ANSWER:
            return (
              <PostAnswer
                index={index}
                content={item.content}
                island={{
                  id: item.island?.id ?? "",
                  name: item.island?.name ?? "",
                  location: item.island?.location ?? "",
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

function isLast(index: number, length: number) {
  return index === length - 1;
}
