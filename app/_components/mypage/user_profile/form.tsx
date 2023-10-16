import { AuthProfile } from "@/app/_api/auth/profile";
import { UserProfileCollection } from "@/app/_api/collections/user_profile";
import { useAlert } from "@/app/_hooks/alert";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

interface UserProfileFormProps {
  userId: string;
  displayName: string;
  photoUrl: string;
  onCancel: () => void;
}

export const UserProfileForm = (props: UserProfileFormProps) => {
  const { showAlert } = useAlert();
  // フォームの状態管理
  const [displayName, setDisplayName] = useState(props.displayName);
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");

  const upperLimit = 20;

  // 表示名の値が変更されたら実行される関数
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setDisplayName(val);
    if (val.length > 0 && val.length <= upperLimit) {
      setNameError(false);
      setNameErrorText("");
    } else if (val.length > upperLimit) {
      setNameError(true);
      setNameErrorText(upperLimit + "文字以内で入力してください。");
    } else {
      setNameError(true);
      setNameErrorText("回答を入力してください。");
    }
  };

  // 保存ボタンが押されたら実行
  async function handleSave() {
    //TODO: 二重投稿防止
    try {
      // TODO: 画像が更新された場合は、リサイズ・ストレージの保存・URLの取得を行う
      // TODO: 一連の処理を外出しする
      const auth = new AuthProfile();
      const profile = new UserProfileCollection(props.userId);
      await Promise.all([
        auth.updateProfile(displayName, props.photoUrl),
        profile.updateProfile(displayName, props.photoUrl),
      ]).then(() => {
        showAlert("プロフィールを更新しました。", "success");
      });
    } catch (error) {
      showAlert("プロフィールの更新に失敗しました。", "error");
    } finally {
      props.onCancel();
    }
  }

  return (
    <Stack direction="row" spacing={2} margin={3} alignItems={"center"}>
      <Tooltip title="画像を変更" placement="top">
        <IconButton aria-label="画像を変更">
          <Avatar
            sizes="large"
            alt={props.displayName}
            src={props.photoUrl}
          ></Avatar>
        </IconButton>
      </Tooltip>
      <TextField
        required
        variant="standard"
        label="表示名"
        defaultValue={displayName}
        onChange={handleNameChange}
        error={nameError}
        helperText={nameErrorText}
      />
      <Button onClick={props.onCancel}>キャンセル</Button>
      <Button variant="outlined" disabled={nameError} onClick={handleSave}>
        保存
      </Button>
    </Stack>
  );
};
