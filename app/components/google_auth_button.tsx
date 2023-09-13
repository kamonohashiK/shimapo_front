//components/google_auth_button.tsx
import firebase_app from "../../firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { Button } from "@mui/material";

export default function GoogleAuthButton() {
  // Google認証
  function authentication() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        //TODO: ログイン後の処理
        console.log("Google認証");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log("Google認証エラー");
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <Button variant="outlined" onClick={authentication}>
      Google
    </Button>
  );
}
