"use client";

import firebase_app from "@/firebase/config";
import { Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { CreateUserProfile } from "@/app/_api/endpoints/user_profile";
import { useAlert } from "@/app/_hooks/alert";
import { useDialog } from "@/app/_hooks/dialog";

export default function GoogleAuthButton() {
  const { showAlert } = useAlert();
  const { hideDialog } = useDialog();

  function SignInWithGoogle() {
    try {
      const auth = getAuth(firebase_app);
      signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            await CreateUserProfile(user.uid, {
              name: user.displayName ?? "未設定",
              image_url: user.photoURL ?? "",
              liked_answers: 0,
              liked_images: 0,
              posted_answers: 0,
              posted_images: 0,
              posted_questions: 0,
            });
            showAlert("ログインに成功しました。", "success");
          }
        });
      });
    } catch (error) {
      showAlert(
        "ログインに失敗しました。時間をおいて再度お試しください。",
        "error"
      );
    } finally {
      hideDialog();
    }
  }

  return (
    <Button variant="outlined" onClick={SignInWithGoogle}>
      ログイン
    </Button>
  );
}
