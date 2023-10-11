"use client";

import firebase_app from "@/firebase/config";
import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { hideDialog } from "@/app/_store/dialogSlice";
import { CreateUserProfile } from "@/app/_api/user_profile";
import { useAlert } from "@/app/_hooks/alert";

export default function GoogleAuthButton() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  function SignInWithGoogle() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            CreateUserProfile({
              userId: user.uid,
              name: user.displayName ?? "未設定",
              image_url: user.photoURL ?? "",
            });
            showAlert("ログインに成功しました。", "success");
            push("/");
          } else {
            showAlert(
              "ログインに失敗しました。時間をおいて再度お試しください。",
              "error"
            );
          }
        });
      })
      .catch(() => {
        showAlert(
          "ログインに失敗しました。時間をおいて再度お試しください。",
          "error"
        );
      })
      .finally(() => {
        dispatch(hideDialog());
      });
  }

  return (
    <Button variant="outlined" onClick={SignInWithGoogle}>
      ログイン
    </Button>
  );
}
