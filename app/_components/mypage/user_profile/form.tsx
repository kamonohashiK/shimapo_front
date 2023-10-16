import { AuthProfile } from "@/app/_api/auth/profile";
import { UserProfileCollection } from "@/app/_api/collections/user_profile";
import { uploadStorage } from "@/app/_api/storage";
import { useAlert } from "@/app/_hooks/alert";
import { resizeImage } from "@/app/_utils/resize_image";
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

  // 画像の状態管理
  const [photoUrl, setPhotoUrl] = useState(props.photoUrl);
  const [file, setFile] = useState<File | null>(null);
  // 画像を変更したかどうかのフラグ
  const [changedPhoto, setChangedPhoto] = useState(false);

  const upperLimit = 20;
  const userId = props.userId;

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

  // 画像が変更されたら実行される関数
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange");
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
      setChangedPhoto(true);
    }
  };

  const handleCancel = () => {
    props.onCancel();
  };

  // 保存ボタンが押されたら実行
  async function handleSave() {
    //TODO: 二重投稿防止
    var uploadedUrl = photoUrl;
    try {
      // 画像が更新された場合は、リサイズ・ストレージの保存~URLの取得を行う
      if (changedPhoto && file) {
        const resizedFile = await resizeImage(file!, 128, 128);

        // ストレージに保存
        const path = `user_profiles/${userId}`;
        await uploadStorage(path, resizedFile).then((imageUrl) => {
          if (imageUrl != "") {
            uploadedUrl = imageUrl;
          } else {
            throw new Error("画像の保存に失敗しました。");
          }
        });
      }

      // TODO: 一連の処理を外出しする
      const auth = new AuthProfile();
      const profile = new UserProfileCollection(userId);
      await Promise.all([
        auth.updateProfile(displayName, uploadedUrl),
        profile.updateProfile(displayName, uploadedUrl),
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
      <label htmlFor="photo-upload">
        <Tooltip title="画像を変更" placement="top">
          <IconButton aria-label="画像を変更" component="span">
            <Avatar
              sizes="large"
              alt="プロフィール画像"
              src={photoUrl}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

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
