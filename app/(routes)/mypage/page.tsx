"use client";
import React from "react";
import { Container, Grid } from "@mui/material";
import Sidebar from "../../_components/sidebar/_";
import { UserProfile } from "@/app/_components/mypage/user_profile";
import { UserStats } from "@/app/_components/mypage/user_stats";
import { NotificationTab } from "@/app/_components/mypage/notification_tab";

export default function MyPage() {
  //TODO: マイページアクセス時に左サイドバーの状態を切り替えるようにする

  return (
    <Container sx={{ maxHeight: "100vh", overflowY: "hidden" }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} id="content">
          <Container fixed>
            <UserProfile />
            <UserStats />
            <NotificationTab />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
