"use client";
import React from "react";
import { setLoginInfo, unmountLoginInfo } from "@/app/_store/slices/userSlice";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { showSidebarText } from "@/app/_store/slices/pageSlice";
import { appText } from "@/app/_constants/text";
import { MypagePC } from "@/app/_components/page/pc/mypage";
import { MypageMobile } from "@/app/_components/page/mobile/mypage";

export default function MyPage() {
  const { push } = useRouter();
  const auth = getAuth(firebase_app);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ログイン状態を検知する TODO: 共通化する
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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

    // サイドバー用のテキストをセットする
    dispatch(
      showSidebarText({
        textHeader: appText.SIDEBAR_TITLE_MYPAGE,
        textBody: appText.SIDEBAR_CONTENT_MYPAGE,
      })
    );

    // コンポーネントがアンマウントされたときにunsubscribeする
    return () => unsubscribe();
  }, []);

  const isMobile = true;
  return <>{isMobile ? <MypageMobile /> : <MypagePC />}</>;
}
