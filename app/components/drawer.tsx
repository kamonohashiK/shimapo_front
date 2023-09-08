import { Drawer } from "@mui/material";

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          zIndex: 1,
        },
      }}
      variant="permanent"
      anchor="left"
    ></Drawer>
  );
}
