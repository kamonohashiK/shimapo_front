import { Stack, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

// 入力フォームの型定義
type SignupForm = {
    email: string;
}

// バリデーションルールの定義
const schema = yup.object({
  email: yup
    .string()
    .required("メールアドレスを入力してください。")
    .email("メールアドレスの形式に誤りがあります。"),
});

export default function EmailSignupForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignupForm>({
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<SignupForm> = (data) => {
      console.log(data);
    };

    return (
      <Stack spacing={2} margin={3} marginLeft={10}>
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
            メールアドレスを送信
          </Button>
        </Stack>
      </Stack>
    );
}