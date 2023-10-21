import { textHelper } from "@/app/_utils/text_helper";
import { Stack, Avatar, Typography, Button } from "@mui/material";

interface UserProfileProps {
  displayName: string;
  photoUrl: string;
  onEdit: () => void;
}

export const UserProfileStandard = (props: UserProfileProps) => {
  const { sanitize } = textHelper();

  return (
    <Stack direction="row" spacing={2} margin={3} alignItems={"center"}>
      <Avatar
        sizes="large"
        alt={props.displayName}
        src={props.photoUrl}
      ></Avatar>
      <Typography variant="h6" color="black">
        {sanitize(props.displayName)}
      </Typography>
      <Button variant="outlined" onClick={props.onEdit}>
        編集
      </Button>
    </Stack>
  );
};
