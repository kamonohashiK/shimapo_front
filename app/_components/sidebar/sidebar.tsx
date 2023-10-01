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

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "25.5%",
          boxSizing: "border-box",
          zIndex: 1,
          justifyContent: "space-around",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {isIslandInfo ? <SidebarIslandInfo /> : <SidebarText title={props.title} content={props.content}/>}
    </Drawer>
  );
}
