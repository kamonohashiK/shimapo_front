import { getIslandInfo } from "@/app/_api/island";
import { createAnswer } from "@/app/_api/question";
import { useAlert } from "@/app/_hooks/alert";
import { useDialog } from "@/app/_hooks/dialog";
import { reloadIslandInfo } from "@/app/_store/pageSlice";
import { RootState } from "@/app/_store/store";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AnswerForm() {
  // フォームの状態管理 FIXME: もうちょっとスマートに書く方法はありそう
  const [answer, setAnswer] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [url, setUrl] = useState("");
  const [errorUrl, setErrorUrl] = useState(false);
  const [errorUrlText, setErrorUrlText] = useState("");

  const upperLimit = 400;

  const islandId = useSelector((state: RootState) => state.page.uid);
  const userId = useSelector((state: RootState) => state.user.userId);
  const focusedQuestion = useSelector(
    (state: RootState) => state.page.focusedQuestion
  );
  const focusedQuestionId = useSelector(
    (state: RootState) => state.page.focusedQuestionId
  );
  const islandName = useSelector((state: RootState) => state.page.name);

  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { hideDialog } = useDialog();

  // 回答欄の値が変更されたら実行される関数
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setAnswer(val);

    if (val.length > 0 && val.length <= upperLimit) {
      setError(false);
      setErrorText("");
    } else if (val.length > upperLimit) {
      setError(true);
      setErrorText(upperLimit + "文字以内で入力してください。");
    } else {
      setError(true);
      setErrorText("回答を入力してください。");
    }
    validation();
  };

  // 参考URLの値が入力されたら実行される関数
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setUrl(val);

    if (val.length === 0 || isValidUrl(val)) {
      // URLの形式が正しい場合の処理
      setErrorUrl(false);
      setErrorUrlText("");
    } else {
      setErrorUrl(true);
      setErrorUrlText("URLの形式に誤りがあります。");
    }
    validation();
  };

  // 投稿ボタンが押されたら実行される関数
  async function handleSubmit() {
    // 二重投稿防止
    setDisabled(true);

    try {
      // TODO: API作成
      if (
        await createAnswer(userId, islandId, focusedQuestionId, answer, url)
      ) {
        showAlert("質問に回答しました。", "success");
        await getIslandInfo(islandId).then((res) => {
          const questionList = res.questionList ? res.questionList : [];
          const imageList = res.imageList ? res.imageList : [];
          dispatch(
            reloadIslandInfo({
              imageList: imageList,
              questionList: questionList,
            })
          );
        });
      } else {
        showAlert("回答の投稿に失敗しました。", "error");
      }
    } catch (error) {
      showAlert("回答の投稿に失敗しました。", "error");
    } finally {
      hideDialog();
    }
  }

  function validation() {
    return setDisabled(error || errorUrl);
  }

  return (
    <Stack spacing={2} margin={3}>
      <Typography variant="h6">
        {islandName}:{focusedQuestion}
      </Typography>
      <Typography paragraph>回答を入力してください。</Typography>
      <FormControl sx={{ m: 1, width: "50ch" }}>
        <TextField
          required
          label={upperLimit + "文字以内で入力"}
          multiline
          rows={4}
          value={answer}
          onChange={handleQuestionChange}
          error={error}
          helperText={errorText}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "50ch" }}>
        <TextField
          label="参考URL"
          value={url}
          onChange={handleUrlChange}
          error={errorUrl}
          helperText={errorUrlText}
        />
      </FormControl>
      <Button variant="outlined" disabled={disabled} onClick={handleSubmit}>
        投稿
      </Button>
    </Stack>
  );
}

// 正しいURLの形式に合っているか判定
function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}
