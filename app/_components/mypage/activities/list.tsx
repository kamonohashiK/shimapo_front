import { notificationTypes } from "@/app/_constants/notification_types";
import { List, Typography } from "@mui/material";
import { PostAnswer } from "./post_answer";
import { PostImage } from "./post_image";
import { PostQuestion } from "./post_question";

interface Props {
  activityListItems: any[];
}

export const ActivityList = (props: Props) => {
  return (
    <>
      {props.activityListItems.length === 0 ? (
        <Typography align="center">
          ここ1ヶ月間のアクティビティはありません。
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
          {props.activityListItems.map((item, index) => {
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
      )}
    </>
  );
};
