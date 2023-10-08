"use client";

import firebase_app from "@/firebase/config";
import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";

export default function GoogleAuthButton() {
  const { push } = useRouter();

  function SignInWithGoogle() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            push('/');
            // TODO: ログイン成功のアラートを表示
          } else {
            // TODO: アラートを表示
          }
        });
      })
      .catch((error) => {
        console.log("Google認証エラー");
        // TODO: アラートを表示
      });
  }

  return (
    <Button variant="outlined" onClick={SignInWithGoogle}>
      Google
    </Button>
  );
}
