import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

interface UserProfileFormProps {
  displayName: string;
  photoUrl: string;
  onCancel: () => void;
}

export const UserProfileForm = (props: UserProfileFormProps) => {
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
        variant="standard"
        label="表示名"
        defaultValue={props.displayName}
      />
      <Button onClick={props.onCancel}>キャンセル</Button>
      <Button variant="outlined">保存</Button>
    </Stack>
  );
};
