import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";

export const FavoriteButton = (props: {
  userId: string;
  imageId: string;
  liked: boolean;
}) => {
  const userId = props.userId;
  const imageId = props.imageId;
  const [liked, setLiked] = useState<boolean>(props.liked);

  function onClick() {
    setLiked(!liked);
    // TODO: 高評価のアクティビティ・リアクションを操作するフックを叩く
  }

  return (
    <IconButton aria-label="favorite" sx={{ color: "white" }} onClick={onClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
