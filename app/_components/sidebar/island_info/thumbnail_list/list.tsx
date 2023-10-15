import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";
import Image from "next/image";
import {
  Typography,
  ImageList,
  ImageListItem,
  Divider,
  Button,
} from "@mui/material";

interface IslandThumbnailListProps {
  thumbnails: any[];
}

export const IslandThumbnailList = (props: IslandThumbnailListProps) => {
  const { showDialog } = useDialog();

  return (
    <>
      {props.thumbnails.length === 0 ? (
        <Typography variant="body1" align="center">
          この島の画像はまだありません。
        </Typography>
      ) : (
        <ImageList cols={3} rowHeight={80}>
          {props.thumbnails.map((item, index) => (
            <ImageListItem key={index}>
              <Image src={item.url} width={100} height={60} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <Divider sx={{ my: 2 }} />
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() => showDialog(dialogTypes.IMAGE_UPLOAD_FORM)}
      >
        画像を追加
      </Button>
    </>
  );
};
