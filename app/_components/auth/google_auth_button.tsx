"use client";

import firebase_app from "@/firebase/config";
import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { hideAlert, setAlert } from "@/app/_store/alertSlice";
import { useDispatch } from "react-redux";

export default function GoogleAuthButton() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  function SignInWithGoogle() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            dispatch(
              setAlert({
                message: "ログインに成功しました。",
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
                message:
                  "ログインに失敗しました。時間をおいて再度お試しください。",
                severity: "error",
                isShown: true,
              })
            );
            setTimeout(() => {
              dispatch(hideAlert());
            }, 5000);
          }
        });
      })
      .catch(() => {
        dispatch(
          setAlert({
            message: "ログインに失敗しました。時間をおいて再度お試しください。",
            severity: "error",
            isShown: true,
          })
        );
        setTimeout(() => {
          dispatch(hideAlert());
        }, 5000);
      });
  }

  return (
    <Button variant="outlined" onClick={SignInWithGoogle}>
      Google
    </Button>
  );
}
