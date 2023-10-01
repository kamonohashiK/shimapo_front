import { Divider, ImageList, ImageListItem } from "@mui/material";
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
                <Divider variant="middle" />
                <ImageList sx={{ width: 360, height: 180 }} cols={3} rowHeight={50}>
                    {props.itemData.map((item, index) => (
                        <ImageListItem key={index}>
                            <Image
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                width={164}
                                height={164}
                                alt={item.title}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Divider variant="middle" />
            </>
        );
}