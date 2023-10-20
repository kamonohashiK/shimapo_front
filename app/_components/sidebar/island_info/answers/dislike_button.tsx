import { Tooltip, IconButton } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useDialog } from "@/app/_hooks/dialog";
import dialogTypes from "@/app/_constants/dialog_types";
import { ToggleDislikeAnswer } from "@/app/_api/endpoints/question_answer";
import { useAlert } from "@/app/_hooks/alert";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { useState } from "react";
import { red } from "@mui/material/colors";

interface DislikeButtonProps {
  disliked_by: string[];
  island_id: string;
  question_id: string;
  answer_id: string;
  user_id: string;
  disliked: boolean;
  disabled: boolean;
}

export default function DislikeButton(props: DislikeButtonProps) {
  const [disliked, setDisliked] = useState<boolean>(props.disliked);
  const { showDialog } = useDialog();
  const { showAlert } = useAlert();
  const { setQuestionList } = useIslandInfo();

  const onClick = async () => {
    setDisliked(!disliked);
    if (props.user_id != "") {
      if (
        await ToggleDislikeAnswer(
          props.island_id,
          props.question_id,
          props.answer_id,
          props.user_id
        )
      ) {
        setQuestionList(props.island_id);
      } else {
        setDisliked(!disliked);
        showAlert("エラーが発生しました。", "error");
      }
    } else {
      showDialog(dialogTypes.AUTH_FORM);
    }
  };

  return (
    <Tooltip
      title={props.disliked ? "評価を取り消す" : "低評価する"}
      placement="top"
    >
      <IconButton onClick={onClick} disabled={props.disabled}>
        {disliked ? (
          <ThumbDownAltIcon sx={{ color: red[400] }} />
        ) : (
          <ThumbDownOffAltIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
