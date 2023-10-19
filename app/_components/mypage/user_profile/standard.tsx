import { Stack, Avatar, Typography, Button } from "@mui/material";

interface UserProfileProps {
  displayName: string;
  photoUrl: string;
  onEdit: () => void;
}

export const UserProfileStandard = (props: UserProfileProps) => {
  return (
    <Stack direction="row" spacing={2} margin={3} alignItems={"center"}>
      <Avatar
        sizes="large"
        alt={props.displayName}
        src={props.photoUrl}
      ></Avatar>
      <Typography variant="h6" color="black">
        {props.displayName}
      </Typography>
      <Button variant="outlined" onClick={props.onEdit}>
        編集
      </Button>
    </Stack>
  );
};
