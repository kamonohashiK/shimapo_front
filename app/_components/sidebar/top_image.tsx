import { Box } from "@mui/material";
import Image from "next/image";

interface SidebarTopImageProps {
    url: string;
}

export default function SidebarTopImage(props: SidebarTopImageProps) {
    return (
        <>
        {props.url != "" ? (
            <Image
                src={props.url}
                height={240}
                width={360}
                alt="sidebar top image"
            />
        ) : (
            <Box sx={{ bgcolor: "#cfe8fc", height: "240px" }} />
        )}
        </>
    );
}