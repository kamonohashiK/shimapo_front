"use client";
import firebase_app from "../../firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "@firebase/auth";
import { Button } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setLoginInfo } from "../store/userSlice";
import { setAccessToken } from "../util/auth";

export default function GoogleAuthButton() {
  // Google認証
  function authentication() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        console.log("Google認証");
        const credential = GoogleAuthProvider.credentialFromResult(result);

        //アクセストークンをクッキーに保存
        const idToken = credential?.idToken;
        const accessToken = credential?.accessToken;
        if (idToken && accessToken) {
          await setAccessToken(idToken, accessToken);

          // 取得したユーザーの情報(uid,displayName,photoUrl)をstoreに保存
          const user = result.user;
          const displayName = user.displayName ? user.displayName : "";
          const photoUrl = user.photoURL ? user.photoURL : "";
          setUserState(user.uid, displayName, photoUrl);
        } else {
          throw new Error("アクセストークンが取得できませんでした。");
        }
      })
      .catch((error) => {
        console.log("Google認証エラー");
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  // storeにユーザー情報を保存
  const dispatch = useAppDispatch();

  function setUserState(
    uid: string,
    displayName: string,
    photoUrl: string
  ) {
    dispatch(
      setLoginInfo({
        uid: uid,
        displayName: displayName,
        photoUrl: photoUrl,
      })
    );
  }

  return (
    <Button variant="outlined" onClick={authentication}>
      Google
    </Button>
  );
}
