import { Typography } from "@mui/material";
import Link from "next/link";

export default function TitleLogo() {
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
                しまぽ
            </Link>
        </Typography>
    );
}