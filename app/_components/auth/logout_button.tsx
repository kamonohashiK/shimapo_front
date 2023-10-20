import { useAlert } from "@/app/_hooks/alert";
import { useDialog } from "@/app/_hooks/dialog";
import firebase_app from "@/firebase/config";
import { getAuth } from "@firebase/auth";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { showAlert } = useAlert();
  const { hideDialog } = useDialog();

  function logout() {
    try {
      const auth = getAuth(firebase_app);
      auth.signOut().then(() => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            showAlert("ログアウトに成功しました。", "success");
          }
        });
      });
    } catch (error) {
      showAlert(
        "ログアウトに失敗しました。時間をおいて再度お試しください。",
        "error"
      );
    } finally {
      hideDialog();
    }
  }

  return (
    <Button variant="outlined" onClick={logout}>
      OK
    </Button>
  );
}
