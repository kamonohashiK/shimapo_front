import { Box } from "@mui/material";

interface SidebarTopImageProps {
    url?: string;
}

export default function SidebarTopImage(props: SidebarTopImageProps) {
    const { url } = props;

    return (
        <>
        {url ? (
            <img
                src={url}
                alt="sidebar top image"
                style={{ height: "240px", width: "100%" }}
            />
        ) : (
            <Box sx={{ bgcolor: "#cfe8fc", height: "240px" }} />
        )}
        </>
    );
}