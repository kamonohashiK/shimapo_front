"use client";
import { Drawer } from "@mui/material";
import SidebarText from "./sidebar_text";
import SidebarIslandInfo from "./sidebar_island_info";
import { useAppSelector } from "../store/hooks";

export default function Sidebar() {
  const isIslandInfo = useAppSelector((state) => state.page.isIslandInfo);

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "30%",
          boxSizing: "border-box",
          zIndex: 1,
          justifyContent: "space-around",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {isIslandInfo ? <SidebarIslandInfo /> : <SidebarText />}
    </Drawer>
  );
}
