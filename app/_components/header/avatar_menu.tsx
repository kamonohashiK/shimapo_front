import { RootState } from "@/app/_store/store";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function AvatarMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const avatarUrl = useSelector((state: RootState) => state.user.photoUrl);
    const displayName = useSelector((state: RootState) => state.user.displayName);

    const menuItems = [
      { text: "地図から探す", href: "/" },
      { text: "ログイン", href: "/login" },
      { text: "寄付をする", href: "/donate" },
    ];

    return (
      <>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {displayName && avatarUrl ? (
            <Avatar alt={displayName} src={avatarUrl} />
          ) : (
            <Avatar></Avatar>
          )}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.href}>
              <Link href={item.href}>{item.text}</Link>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
}