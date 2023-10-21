import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useMap } from "@/app/_hooks/map";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";

export const FavoriteButton = (props: {
  islandId: string;
  userId: string;
  imageId: string;
  liked: boolean;
  imageUrl: string;
}) => {
  const [liked, setLiked] = useState<boolean>(props.liked);
  const { likeImage } = useMap();
  const { showDialog } = useDialog();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  function onClick() {
    if (loggedIn) {
      setLiked(!liked);
      // TODO: エラー時の処理
      likeImage(
        props.islandId,
        props.imageId,
        props.userId,
        props.imageUrl,
        !liked
      );
    } else {
      return showDialog(dialogTypes.AUTH_FORM);
    }
  }

  return (
    <IconButton aria-label="favorite" sx={{ color: "white" }} onClick={onClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
