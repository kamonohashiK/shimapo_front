import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useMap } from "@/app/_hooks/map";

export const FavoriteButton = (props: {
  islandId: string;
  userId: string;
  imageId: string;
  liked: boolean;
  imageUrl: string;
}) => {
  const [liked, setLiked] = useState<boolean>(props.liked);
  const { likeImage } = useMap();

  function onClick() {
    setLiked(!liked);
    // TODO: エラー時の処理
    likeImage(
      props.islandId,
      props.imageId,
      props.userId,
      props.imageUrl,
      !liked
    );
  }

  return (
    <IconButton aria-label="favorite" sx={{ color: "white" }} onClick={onClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
