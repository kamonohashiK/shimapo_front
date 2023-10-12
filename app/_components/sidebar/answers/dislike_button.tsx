import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useState } from "react";

interface DislikeButtonProps {
  disliked_by: string[];
}

export default function DislikeButton(props: DislikeButtonProps) {
  const [disliked, setDisliked] = useState(false);

  // 低評価ボタンの状態を管理する(UI確認用に一時的に追加)
  const toggleDisliked = () => {
    setDisliked(!disliked);
  };

  return (
    <Tooltip title="低評価する" placement="top">
      <IconButton onClick={toggleDisliked}>
        {disliked ? (
          <ThumbDownAltIcon color="error" />
        ) : (
          <ThumbDownOffAltIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
