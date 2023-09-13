import { Drawer } from "@mui/material";
import SidebarText from "./sidebar_text";
import SidebarIslandInfo from "./sidebar_island_info";

// 動作確認用変数
const isIslandInfo: Boolean = true;

export default function Sidebar() {
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