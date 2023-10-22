import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  imageUrl: string;
  name: string;
  prefecture: string;
  city: string;
  kana: string;
  enName: string;
}

export default function UnderDrawerTop(props: Props) {
  return (
    <>
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
