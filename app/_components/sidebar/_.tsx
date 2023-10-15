"use client";
import { Drawer } from "@mui/material";
import SidebarText from "./text/_";
import SidebarIslandInfo from "./island_info/_";
import { useAppSelector } from "../../_store/hooks";

export default function Sidebar() {
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
      {isIslandInfo ? <SidebarIslandInfo /> : <SidebarText />}
    </Drawer>
  );
}
