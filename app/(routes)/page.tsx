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
import { useIslandInfo } from "../_hooks/island_info";

export default function Home() {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

  const auth = getAuth(firebase_app);
  const dispatch = useDispatch();
  const { setIsMobile } = useIslandInfo();

  React.useEffect(() => {
    // 横幅が600px以下の場合はモバイルとみなす TODO: ここも全ページで使いまわしたい
    setIsMobile(window.innerWidth < 600);

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

    const hoge = true;
    // #131 あからさまなクソコードをあえて書く
    if (hoge === true) {
      console.log("hoge is true");
      // さらにクソコードを書く
      const fuga = false;
      if (fuga) {
        console.log("fuga is true");
      } else {
        console.log("fuga is false");
      }
    }

    // コンポーネントがアンマウントされたときにunsubscribeする
    return () => unsubscribe();
  }, []);

  const isMap = useSelector((state: RootState) => state.map.isMap);
  const isMobile = useSelector((state: RootState) => state.page.isMobile);

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
