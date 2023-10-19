import { RootState } from "@/app/_store/store";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Launch } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import dialogTypes from "@/app/_constants/dialog_types";
import { useDialog } from "@/app/_hooks/dialog";

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
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const { showDialog } = useDialog();

  const menuItems = [
    {
      text: "マイページ",
      href: "/mypage",
      external: false,
      loginOnly: true,
    },
    /**
    {
      text: "寄付をする",
      href: process.env.NEXT_PUBLIC_STRIPE_DONATION_URL || "",
      external: true,
      loginOnly: false,
    },
     */
  ];

  const authModal = () => {
    showDialog(dialogTypes.AUTH_FORM);
  };

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
        <MenuItem key="authentication" onClick={authModal}>
          {isLoggedIn ? "ログアウト" : "ログイン"}
        </MenuItem>
        {menuItems.map(
          (item, index) =>
            (isLoggedIn || !item.loginOnly) && ( // ログアウトしている場合はマイページへのリンクを表示しない
              <MenuItem
                key={index}
                onClick={handleClose}
                component={item.external ? "a" : Link}
                href={item.href}
                target={item.external ? "_blank" : undefined}
              >
                {item.text}
                {item.external && (
                  <ListItemIcon>
                    <Launch fontSize="small" />
                  </ListItemIcon>
                )}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
}
