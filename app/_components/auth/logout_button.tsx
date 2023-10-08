import { setAlert, hideAlert } from "@/app/_store/alertSlice";
import { hideDialog } from "@/app/_store/dialogSlice";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();

  function logout() {
    const auth = getAuth(firebase_app);
    auth
      .signOut()
      .then(() => {
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
      })
      .finally(() => {
        dispatch(hideDialog());
      });
  }

  return (
    <Button variant="outlined" onClick={logout}>
      OK
    </Button>
  );
}
