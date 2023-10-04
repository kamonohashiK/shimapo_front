import { useAppDispatch } from "@/app/_store/hooks";
import { showDialog } from "@/app/_store/dialogSlice";
import { Button, Divider, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import dialogTypes from "@/app/_constants/dialog_types";

interface IslandImageListProps {
  itemData: {
    img: string;
    title: string;
  }[];
}

export default function IslandImageList(props: IslandImageListProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <ImageList sx={{ width: 380 }} cols={3} rowHeight={80}>
        {props.itemData.map((item, index) => (
          <ImageListItem key={index}>
            <Image
              src={`${item.img}?w=100&h=60&fit=crop&auto=format`}
              width={100}
              height={60}
              alt={item.title}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Divider sx={{ my: 2 }} />
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() =>
          dispatch(
            showDialog({ isShown: true, type: dialogTypes.IMAGE_UPLOAD_FORM })
          )
        }
      >
        画像を追加
      </Button>
    </>
  );
}
