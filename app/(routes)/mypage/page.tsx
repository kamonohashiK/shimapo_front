"use client";
import React from "react";
import { Typography, Container, Grid, Stack, Button } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";
import HeaderAlert from "@/app/_components/util/header_alert";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/navigation";

export default function MyPage() {
    const sidebarTitle = "マイページ";
    const sidebarText = "マイページの説明文";

    const { push } = useRouter();

    function logout() {
        const auth = getAuth(firebase_app);
        auth.signOut().then(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
              push("/"); //TODO: ログアウト成功のアラートを表示
            } else {
              //TODO: アラートを表示
            }
        });
      });
    }

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={8} id="content">
        <Container className="content" fixed>
          <HeaderAlert />
          <Typography variant="h4" color="secondary">
            My Page
          </Typography>
          <Stack spacing={2} margin={3}>
            <Button variant="outlined" onClick={logout}>ログアウト</Button>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
