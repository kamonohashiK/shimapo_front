import { notificationTypes } from "@/app/_constants/notification_types";
import { List, Typography } from "@mui/material";
import { AnswerQuestion } from "./answer_question";
import { LikeAnswer } from "./like_answer";
import { LikeImage } from "./like_image";

interface Props {
  reactionListItems: any[];
}

export default function ReactionList(props: Props) {
  return (
    <>
      {props.reactionListItems.length === 0 ? (
        <Typography align="center">
          ここ1ヶ月間のリアクションはありません。
        </Typography>
      ) : (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "50vh",
            overflow: "auto",
          }}
        >
          {props.reactionListItems.map((item, index) => {
            switch (item.type) {
              case notificationTypes.LIKE_IMAGE:
                return (
                  <LikeImage
                    index={index}
                    content={item.content}
                    island={{
                      id: item.island.id ?? "",
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
              case notificationTypes.ANSWER_QUESTION:
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
              case notificationTypes.LIKE_ANSWER:
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
      )}
    </>
  );
}
