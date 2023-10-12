import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

interface DislikeButtonProps {
  disliked_by: string[];
}

export default function DislikeButton(props: DislikeButtonProps) {
  return (
    <Tooltip title="低評価する" placement="top">
      <IconButton>
        <ThumbDownOffAltIcon />
      </IconButton>
    </Tooltip>
  );
}
