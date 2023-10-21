"use client";
import * as React from "react";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLoginInfo, unmountLoginInfo } from "../_store/slices/userSlice";
import { RootState } from "../_store/store";
import { appText } from "../_constants/text";
import { showSidebarText } from "../_store/slices/pageSlice";
import { TopPagePC } from "../_components/page/pc/top";
import { TopPageMobile } from "../_components/page/mobile/top";

export default function Home() {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

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

    // サイドバー用のテキストをセットする
    dispatch(
      showSidebarText({
        textHeader: appText.SIDEBAR_TITLE_TOP,
        textBody: appText.SIDEBAR_CONTENT_TOP,
      })
    );

    // コンポーネントがアンマウントされたときにunsubscribeする
    return () => unsubscribe();
  }, []);

  const isMap = useSelector((state: RootState) => state.map.isMap);
  const isMobile = true;

  return (
    <>
      {isMobile ? (
        <TopPageMobile isMap={isMap} googleMapApiKey={googleMapApiKey} />
      ) : (
        <TopPagePC isMap={isMap} googleMapApiKey={googleMapApiKey} />
      )}
    </>
  );
}
