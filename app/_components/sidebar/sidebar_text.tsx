"use client";
import Typography from "@mui/material/Typography";

interface SidebarTextProps {
  title: string;
  content: string;
}

export default function SidebarText(props: SidebarTextProps) {
  return (
    <>
      <Typography align="center" paragraph margin={"10px"}>
        <b>{props.title}</b>
        <br></br>
        {props.content}
      </Typography>
    </>
  );
}
