"use client";

import firebase_app from "@/firebase/config";
import { Button } from "@mui/material";
import firebase, { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";

export default function GoogleAuthButton() {

  function SignInWithGoogle() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        //TODO: ログイン後の処理
        console.log("Google認証");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken ?? "";
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log("Google認証エラー");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <Button variant="outlined" onClick={SignInWithGoogle}>
      Google
    </Button>
  );
}
