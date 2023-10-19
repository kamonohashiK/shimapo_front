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

export default function Header() {
  const pathname = usePathname();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderAlert />
          <TitleLogo />
          {pathname == "/" ? <SearchBar /> : null}
          <AvatarMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
