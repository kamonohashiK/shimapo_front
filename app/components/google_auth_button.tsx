//components/google_auth_button.tsx
import firebase_app from "../../firebase/config";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "@firebase/auth";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoginInfo } from "../store/userSlice";

export default function GoogleAuthButton() {
  // Google認証
  function authentication() {
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        console.log("Google認証");
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // TODO: アクセストークンをどこかに保存(場所は要検討)
        const token = credential.accessToken;
        //console.log(token);

        // 取得したユーザーの情報(uid,displayName,photoUrl)をstoreに保存
        const user = result.user;
        setUserState(user.uid, user.displayName, user.photoURL);
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
  const dispatch = useDispatch();

  function setUserState(
    uid: string,
    displayName: string | null,
    photoUrl: string | null
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
