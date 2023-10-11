import { useAlert } from "@/app/_hooks/alert";
import { hideDialog } from "@/app/_store/dialogSlice";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  function logout() {
    const auth = getAuth(firebase_app);
    auth
      .signOut()
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            showAlert("ログアウトしました。", "success");
          } else {
            showAlert(
              "ログアウトに失敗しました。時間をおいて再度お試しください。",
              "error"
            );
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
