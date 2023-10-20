import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";
import { ToggleLikeAnswer } from "@/app/_api/endpoints/question_answer";
import { useAlert } from "@/app/_hooks/alert";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { useState } from "react";
import { lightGreen } from "@mui/material/colors";
interface LikeButtonProps {
  liked_by: string[];
  island_id: string;
  question_id: string;
  answer_id: string;
  user_id: string;
  liked: boolean;
  disabled: boolean;
}

// liked_byの要素数を返す
const countLiked = (array: any[]) => {
  return array ? array.length : 0;
};

export default function LikeButton(props: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);

  const { showDialog } = useDialog();
  const { showAlert } = useAlert();
  const { setQuestionList } = useIslandInfo();

  const onClick = async () => {
    setLiked(!liked);
    if (props.user_id != "") {
      if (
        await ToggleLikeAnswer(
          props.island_id,
          props.question_id,
          props.answer_id,
          props.user_id
        )
      ) {
        setQuestionList(props.island_id);
      } else {
        setLiked(!liked);
        showAlert("エラーが発生しました。", "error");
      }
    } else {
      showDialog(dialogTypes.AUTH_FORM);
    }
  };

  return (
    <>
      <Tooltip
        title={props.liked ? "評価を取り消す" : "高評価する"}
        placement="top"
      >
        <IconButton onClick={onClick} disabled={props.disabled}>
          {liked ? (
            <ThumbUpIcon color="success" sx={{ color: lightGreen[700] }} />
          ) : (
            <ThumbUpOffAltIcon />
          )}
        </IconButton>
      </Tooltip>
      <Typography>{countLiked(props.liked_by)}</Typography>
    </>
  );
}
