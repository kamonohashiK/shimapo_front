"use client";
import { Drawer } from "@mui/material";
import SidebarText from "./sidebar_text";
import SidebarIslandInfo from "./sidebar_island_info";
import { useAppSelector } from "../../_store/hooks";

interface SidebarProps {
  title: string;
  content: string;
}

export default function Sidebar(props: SidebarProps) {
  const isIslandInfo = useAppSelector((state) => state.page.isIslandInfo);
  const justifyContent = isIslandInfo ? "" : "space-around";

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "34.3%",
          paddingTop: "4em",
          boxSizing: "border-box",
          zIndex: 1,
          justifyContent: justifyContent,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {isIslandInfo ? (
        <SidebarIslandInfo />
      ) : (
        <SidebarText title={props.title} content={props.content} />
      )}
    </Drawer>
  );
}
