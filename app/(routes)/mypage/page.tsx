"use client";
import React from "react";
import { Typography, Container, Grid, Stack, Button } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert, hideAlert } from "@/app/_store/alertSlice";

export default function MyPage() {
    const sidebarTitle = "マイページ";
    const sidebarText = "マイページの説明文";

    const { push } = useRouter();
    const dispatch = useDispatch();

    function logout() {
        const auth = getAuth(firebase_app);
        auth.signOut().then(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
              dispatch(
                setAlert({
                  message: "ログアウトしました。",
                  severity: "success",
                  isShown: true,
                })
              );
              setTimeout(() => {
                dispatch(hideAlert());
              }, 5000);
              push("/");
            } else {
              dispatch(
                setAlert({
                  message: "ログアウトに失敗しました。時間をおいて再度お試しください。",
                  severity: "error",
                  isShown: true,
                })
              );
              setTimeout(() => {
                dispatch(hideAlert());
              }, 5000);
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
