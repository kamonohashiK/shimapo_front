"use client";
import * as React from "react";
import IslandsMap from "../_components/islands_map";
import Sidebar from "../_components/sidebar/sidebar";
import Grid from "@mui/material/Grid";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { setLoginInfo, unmountLoginInfo } from "../_store/userSlice";
import CustomImageList from "../_components/image_list";

export default function Home() {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const auth = getAuth(firebase_app);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ログイン状態を検知する TODO: ここを全ページで使いまわしたい
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
      }
    });

    // コンポーネントがアンマウントされたときにunsubscribeする
    return () => unsubscribe();
  }, []);

  const isMap = true;

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        {isMap ? <IslandsMap apiKey={googleMapApiKey} /> : <CustomImageList />}
      </Grid>
    </Grid>
  );
}
