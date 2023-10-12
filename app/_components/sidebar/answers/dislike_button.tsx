import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useState } from "react";
import { useDialog } from "@/app/_hooks/dialog";
import dialogTypes from "@/app/_constants/dialog_types";

interface DislikeButtonProps {
  disliked_by: string[];
  user_id: string;
}

export default function DislikeButton(props: DislikeButtonProps) {
  const { showDialog } = useDialog();
  const disliked = (props.disliked_by || []).includes(props.user_id);

  const onClick = () => {
    if (props.user_id != "") {
      // TODO: 高評価時の処理
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
