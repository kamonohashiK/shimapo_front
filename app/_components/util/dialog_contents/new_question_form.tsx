import { createQuestion } from "@/app/_api/endpoints/island_question";
import { useAlert } from "@/app/_hooks/alert";
import { useDialog } from "@/app/_hooks/dialog";
import { useIslandInfo } from "@/app/_hooks/island_info";
import { RootState } from "@/app/_store/store";
import {
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function NewQuestionForm() {
  // フォームの状態管理
  const [question, setQuestion] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const islandId = useSelector((state: RootState) => state.page.uid);
  const userId = useSelector((state: RootState) => state.user.userId);

  const { showAlert } = useAlert();
  const { hideDialog } = useDialog();
  const { setQuestionList } = useIslandInfo();

  // 値が変更されたら実行される関数
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setQuestion(val);

    if (val.length > 0 && val.length <= 40) {
      setDisabled(false);
      setError(false);
      setErrorText("");
    } else if (val.length > 40) {
      setDisabled(true);
      setError(true);
      setErrorText("40文字以内で入力してください。");
    } else {
      setDisabled(true);
      setError(true);
      setErrorText("質問を入力してください。");
    }
  };

  // 投稿ボタンが押されたら実行される関数
  async function handleSubmit() {
    // 二重投稿防止
    setDisabled(true);

    try {
      if (await createQuestion(islandId, userId, question)) {
        showAlert("質問を投稿しました。", "success");
        await setQuestionList(islandId);
      } else {
        showAlert("質問の投稿に失敗しました。", "error");
      }
    } catch (error) {
      showAlert("質問の投稿に失敗しました。", "error");
    } finally {
      hideDialog();
    }
  }

  return (
    <Stack spacing={2} margin={3}>
      <Typography paragraph>質問を入力してください。</Typography>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <TextField
          label="40文字以内で入力"
          multiline
          rows={2}
          value={question}
          onChange={handleQuestionChange}
          error={error}
          helperText={errorText}
        />
      </FormControl>
      <Button variant="outlined" disabled={disabled} onClick={handleSubmit}>
        投稿
      </Button>
    </Stack>
  );
}
