"use client";
import { useAppSelector } from "@/app/_store/hooks";
import Typography from "@mui/material/Typography";

export default function SidebarText() {
  const pageState = useAppSelector((state) => state.page);
  return (
    <>
      <Typography align="center" paragraph margin={"10px"}>
        <b>{pageState.textHeader}</b>
        <br></br>
        {pageState.textBody}
      </Typography>
    </>
  );
}
