"use client";
import React from "react";
import { Container, Grid } from "@mui/material";
import Sidebar from "../../_components/sidebar/_";
import { UserProfile } from "@/app/_components/mypage/user_profile";
import { UserStats } from "@/app/_components/mypage/user_stats";
import { NotificationTab } from "@/app/_components/mypage/notification_tab";
import { setLoginInfo, unmountLoginInfo } from "@/app/_store/slices/userSlice";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const { push } = useRouter();
  const auth = getAuth(firebase_app);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ログイン状態を検知する TODO: 共通化する
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setLoginInfo({
            displayName: user.displayName!,
            userId: user.uid,
            photoUrl: user.photoURL!,
            loggedIn: true,
          })
        );
      } else {
        dispatch(unmountLoginInfo());
        push("/");
      }
    });

    // コンポーネントがアンマウントされたときにunsubscribeする
    return () => unsubscribe();
  }, []);

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
