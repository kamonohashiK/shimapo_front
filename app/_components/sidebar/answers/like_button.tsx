import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";
import { ToggleLikeAnswer } from "@/app/_api/question";
import { useAlert } from "@/app/_hooks/alert";

interface LikeButtonProps {
  liked_by: string[];
  island_id: string;
  question_id: string;
  answer_id: string;
  user_id: string;
}

// liked_byの要素数を返す
const countLiked = (array: any[]) => {
  return array ? array.length : 0;
};

export default function LikeButton(props: LikeButtonProps) {
  const { showDialog } = useDialog();
  const { showAlert } = useAlert();
  const liked = (props.liked_by || []).includes(props.user_id);

  const onClick = async () => {
    if (props.user_id != "") {
      if (
        await ToggleLikeAnswer(
          props.island_id,
          props.question_id,
          props.answer_id,
          props.user_id
        )
      ) {
        // TODO: リロード
      } else {
        showAlert("エラーが発生しました。", "error");
      }
    } else {
      showDialog(dialogTypes.AUTH_FORM);
    }
  };

  return (
    <>
      <Tooltip title="高評価する" placement="top">
        <IconButton onClick={onClick}>
          {liked ? <ThumbUpIcon color="success" /> : <ThumbUpOffAltIcon />}
        </IconButton>
      </Tooltip>
      <Typography>{countLiked(props.liked_by)}</Typography>
    </>
  );
}
