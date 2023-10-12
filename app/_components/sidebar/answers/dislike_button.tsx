import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useState } from "react";

interface DislikeButtonProps {
  disliked_by: string[];
  user_id: string;
}

export default function DislikeButton(props: DislikeButtonProps) {
  const disliked = (props.disliked_by || []).includes(props.user_id);

  return (
    <Tooltip title="低評価する" placement="top">
      <IconButton>
        {disliked ? (
          <ThumbDownAltIcon color="error" />
        ) : (
          <ThumbDownOffAltIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
