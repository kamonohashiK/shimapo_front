import { RootState } from "@/app/_store/store";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import GoogleAuthButton from "../../auth/google_auth_button";
import LogoutButton from "../../auth/logout_button";

export default function AuthForm() {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Typography paragraph>ログアウトします。よろしいですか？</Typography>
          <Stack spacing={2} margin={3}>
            <LogoutButton />
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h6">
            画像の投稿や質問・評価にはログインが必要です。
          </Typography>
          <Typography variant="caption">
            Googleアカウントがあればすぐに利用開始できます。
          </Typography>
          <Stack spacing={2} margin={3}>
            <GoogleAuthButton />
          </Stack>
        </>
      )}
    </>
  );
}
