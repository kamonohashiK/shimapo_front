import {
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";

interface IslandImageListProps {
  itemData: {
    url: string;
    title: string;
  }[];
}

export default function IslandImageList(props: IslandImageListProps) {
  const { showDialog } = useDialog();

  return (
    <>
      {props.itemData.length === 0 ? (
        <Typography variant="body1" align="center">
          この島の画像はまだありません。
        </Typography>
      ) : (
        <ImageList cols={3} rowHeight={80}>
          {props.itemData.map((item, index) => (
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
}
