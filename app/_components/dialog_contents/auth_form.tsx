import { setAlert, hideAlert } from "@/app/_store/alertSlice";
import { hideDialog } from "@/app/_store/dialogSlice";
import { RootState } from "@/app/_store/store";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuthButton from "../auth/google_auth_button";

export default function AuthForm() {

    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const dispatch = useDispatch();

    // ログアウト処理
    function logout() {
      const auth = getAuth(firebase_app);
      auth.signOut().then(() => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            dispatch(
              setAlert({
                message: "ログアウトしました。",
                severity: "success",
                isShown: true,
              })
            );
            setTimeout(() => {
              dispatch(hideAlert());
            }, 5000);
          } else {
            dispatch(
              setAlert({
                message:
                  "ログアウトに失敗しました。時間をおいて再度お試しください。",
                severity: "error",
                isShown: true,
              })
            );
            setTimeout(() => {
              dispatch(hideAlert());
            }, 5000);
          }
        });
      }).finally(() => {
        dispatch(hideDialog());
      });
    }

    return (
      <>{ isLoggedIn ?
        <>
        <Typography paragraph>ログアウトします。よろしいですか？</Typography>
        <Stack spacing={2} margin={3}>
          <Button variant="outlined" onClick={logout}>
            OK
          </Button>
        </Stack>
        </> :
        <>
        <Typography paragraph>SNSアカウントを使用してログインできます。</Typography>
         <Stack spacing={2} margin={3}>
          <GoogleAuthButton />
        </Stack>
        </>
        }
      </>
    );
}