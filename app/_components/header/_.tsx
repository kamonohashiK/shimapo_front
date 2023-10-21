"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "./search_bar";
import { usePathname } from "next/navigation";
import TitleLogo from "./title_logo";
import AvatarMenu from "./avatar_menu";
import HeaderAlert from "./alert";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";

export default function Header() {
  const pathname = usePathname();
  const isMobile = useSelector((state: RootState) => state.page.isMobile);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderAlert />
          {!isMobile || pathname != "/" ? <TitleLogo /> : null}
          {pathname == "/" ? <SearchBar isMobile={isMobile} /> : null}
          <AvatarMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
