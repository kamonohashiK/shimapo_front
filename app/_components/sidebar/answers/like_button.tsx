import { Tooltip, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";

interface LikeButtonProps {
  liked_by: string[];
  user_id: string;
}

// liked_byの要素数を返す
const countLiked = (array: any[]) => {
  return array ? array.length : 0;
};

export default function LikeButton(props: LikeButtonProps) {
  const { showDialog } = useDialog();
  const liked = (props.liked_by || []).includes(props.user_id);

  const onClick = () => {
    if (props.user_id != "") {
      // TODO: 高評価時の処理
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
