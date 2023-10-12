import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useState } from "react";

interface LikeButtonProps {
  liked_by: string[];
  user_id: string;
}

// liked_byの要素数を返す
const countLiked = (array: any[]) => {
  return array ? array.length : 0;
};

export default function LikeButton(props: LikeButtonProps) {
  const liked = (props.liked_by || []).includes(props.user_id);

  return (
    <>
      <Tooltip title="高評価する" placement="top">
        <IconButton>
          {liked ? <ThumbUpIcon color="success" /> : <ThumbUpOffAltIcon />}
        </IconButton>
      </Tooltip>
      <Typography>{countLiked(props.liked_by)}</Typography>
    </>
  );
}
