"use client";
import { useAppSelector } from "@/app/_store/hooks";
import { textHelper } from "@/app/_utils/text_helper";
import Typography from "@mui/material/Typography";

export default function SidebarText() {
  const pageState = useAppSelector((state) => state.page);
  const { sanitize } = textHelper();

  return (
    <>
      <Typography align="left" paragraph sx={{ margin: 3 }}>
        <b>{pageState.textHeader}</b>
        <br />
        {sanitize(pageState.textBody)}
      </Typography>
    </>
  );
}
