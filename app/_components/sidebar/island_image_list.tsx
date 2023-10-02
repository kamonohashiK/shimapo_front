import { Button, Divider, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

interface IslandImageListProps {
    itemData: {
        img: string;
        title: string;
    }[];
}

export default function IslandImageList(props: IslandImageListProps) {
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
            <Button color="primary" variant="outlined" fullWidth>
              画像を追加
            </Button>
          </>
        );
}