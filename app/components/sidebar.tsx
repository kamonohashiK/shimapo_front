import { Drawer } from "@mui/material";
import Typography from "@mui/material/Typography";

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
          justifyContent: "space-around",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography align="center" paragraph margin={"10px"}>
        <b>Lorem ipsum</b>
        <br></br>
        dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
        dolor purus non enim praesent elementum facilisis leo vel. Risus at
        ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
        quisque non tellus. Convallis convallis tellus id interdum velit laoreet
        id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
        Amet nisl
      </Typography>
    </Drawer>
  );
}
