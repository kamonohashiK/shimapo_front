import { Drawer } from "@mui/material";
import SidebarText from "./sidebar_text";
import SidebarIslandInfo from "./sidebar_island_info";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Sidebar() {
  const isIslandInfo = useSelector(
    (state: RootState) => state.page.isIslandInfo
  );

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
