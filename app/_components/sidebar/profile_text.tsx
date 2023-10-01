import { Typography } from "@mui/material";

interface ProfileTextProps {
    name: string;
    prefecture: string;
    city: string;
    kana: string;
    enName: string;
}

export default function ProfileText(props: ProfileTextProps) {
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