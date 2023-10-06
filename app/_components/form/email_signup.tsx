import { Stack, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { hideAlert, setAlert } from "@/app/_store/alertSlice";
import axios from "axios";

// 入力フォームの型定義
type SignupForm = {
  email: string;
};

// バリデーションルールの定義
const schema = yup.object({
  email: yup
    .string()
    .required("メールアドレスを入力してください。")
    .email("メールアドレスの形式に誤りがあります。"),
});

export default function EmailSignupForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignupForm) => {
    // TODO: 環境変数からURLを取得するようにする
    axios
      .post("http://localhost:18000/api/v1/auth/signup", data)
      .then((response) => {
        if (response.status === 200) {
          // 成功時
          handleAlert(
            true,
            "送信されたメールアドレスに案内メールを送信しました。"
          );
        } else {
          // 失敗時
          handleAlert(
            false,
            "送信時にエラーが発生しました。時間を置いて再度お試しください。"
          );
        }
      })
      .catch(() => {
        handleAlert(
          false,
          "送信時にエラーが発生しました。時間を置いて再度お試しください。"
        );
      });
  };

  function handleAlert(succeed: boolean, message: string) {
    if (succeed) {
      dispatch(
        setAlert({ severity: "success", message: message, isShown: true })
      );
    } else {
      dispatch(
        setAlert({ severity: "error", message: message, isShown: true })
      );
    }

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  }

  return (
    <Stack spacing={2} margin={3}>
      <Stack spacing={2} margin={3}>
        <TextField
          id="email"
          required
          error={!!errors.email}
          label="メールアドレス"
          {...register("email")}
          helperText={errors.email?.message}
        />
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          送信
        </Button>
      </Stack>
    </Stack>
  );
}
