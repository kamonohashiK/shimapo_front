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
import { useMap } from "@/app/_hooks/map";
import { usePathname } from "next/navigation";

interface IslandThumbnailListProps {
  thumbnails: any[];
}

export const IslandThumbnailList = (props: IslandThumbnailListProps) => {
  const { showDialog } = useDialog();
  const { setIsMap } = useMap();
  const router = usePathname();

  function handleImageClick() {
    if (router === "/") {
      setIsMap(false);
    }
  }

  return (
    <>
      {props.thumbnails.length === 0 ? (
        <Typography variant="body1" align="center">
          この島の画像はまだありません。
        </Typography>
      ) : (
        <ImageList cols={3} rowHeight={80}>
          {props.thumbnails.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={handleImageClick}
            >
              <Image
                src={item.url}
                width={100}
                height={60}
                alt={`サムネイル${index + 1}`}
              />
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
