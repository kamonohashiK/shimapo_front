import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Container,
  Fab,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { UnderDrawerText } from "./text/_";
import UnderDrawerTop from "./island_info/top";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";
import UnderDrawerIslandInfo from "./island_info/_";
import { setIsMap } from "@/app/_store/slices/mapSlice";
import CloseIcon from "@mui/icons-material/Close";

export const UnderDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const islandInfo = useSelector((state: RootState) => state.page);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <Container
        sx={{ color: "black", height: 112, overflow: "hidden" }}
        onClick={() => setOpen(true)}
      >
        {islandInfo.isIslandInfo ? (
          <UnderDrawerTop
            name={islandInfo.name}
            prefecture={islandInfo.prefecture}
            city={islandInfo.city}
            kana={islandInfo.kana}
            enName={islandInfo.enName}
          />
        ) : (
          <UnderDrawerText />
        )}
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <Box role="presentation">
            <Typography variant="subtitle2" textAlign="center" lineHeight={3}>
              ※閉じるには下方向にスワイプ
            </Typography>
            {islandInfo.isIslandInfo ? (
              <UnderDrawerIslandInfo />
            ) : (
              <UnderDrawerText />
            )}
          </Box>
        </SwipeableDrawer>
      </Container>
    </React.Fragment>
  );
};
