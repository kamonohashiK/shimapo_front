import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useDialog } from "@/app/_hooks/dialog";
import dialogTypes from "@/app/_constants/dialog_types";
import { ToggleDislikeAnswer } from "@/app/_api/question";
import { useAlert } from "@/app/_hooks/alert";

interface DislikeButtonProps {
  disliked_by: string[];
  island_id: string;
  question_id: string;
  answer_id: string;
  user_id: string;
}

export default function DislikeButton(props: DislikeButtonProps) {
  const { showDialog } = useDialog();
  const { showAlert } = useAlert();
  const disliked = (props.disliked_by || []).includes(props.user_id);

  const onClick = async () => {
    if (props.user_id != "") {
      if (
        await ToggleDislikeAnswer(
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
    <Tooltip title="低評価する" placement="top">
      <IconButton onClick={onClick}>
        {disliked ? (
          <ThumbDownAltIcon color="error" />
        ) : (
          <ThumbDownOffAltIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
