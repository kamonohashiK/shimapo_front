import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface SidebarTopProps {
    imageUrl: string;
    name: string;
    prefecture: string;
    city: string;
    kana: string;
    enName: string;
}

export default function SidebarTop(props: SidebarTopProps) {
    return (
      <>
        {props.imageUrl != "" ? (
          <Image
            src={props.imageUrl}
            height={240}
            width={360}
            alt="sidebar top image"
          />
        ) : (
          <Box sx={{ bgcolor: "#cfe8fc", height: "240px" }} />
        )}
        <Typography variant="h4" mt={2}>
          {props.name}
        </Typography>
        <Typography variant="subtitle1">
          {props.prefecture} {props.city}
        </Typography>
        <Typography variant="subtitle2">
          {props.kana} / {props.enName}
        </Typography>
      </>
    );
}