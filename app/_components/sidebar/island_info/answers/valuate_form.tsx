import { Stack } from "@mui/material";
import DislikeButton from "./dislike_button";
import LikeButton from "./like_button";

interface ValuateFormProps {
  liked_by: string[];
  disliked_by: string[];
  user_id: string;
  island_id: string;
  question_id: string;
  answer_id: string;
}

export default function ValuateForm(props: ValuateFormProps) {
  const liked = (props.liked_by || []).includes(props.user_id);
  const disliked = (props.disliked_by || []).includes(props.user_id);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", justifyContent: "right" }}
    >
      <LikeButton
        liked_by={props.liked_by}
        user_id={props.user_id}
        island_id={props.island_id}
        question_id={props.question_id}
        answer_id={props.answer_id}
        liked={liked}
        disabled={disliked}
      />
      <DislikeButton
        disliked_by={props.disliked_by}
        user_id={props.user_id}
        island_id={props.island_id}
        question_id={props.question_id}
        answer_id={props.answer_id}
        disliked={disliked}
        disabled={liked}
      />
    </Stack>
  );
}
