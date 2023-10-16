import { Avatar, Button, Stack, Typography } from "@mui/material";

interface UserProfileProps {
  displayName: string;
  photoUrl: string;
}

export const UserProfile = (props: UserProfileProps) => {
  return (
    <Stack direction="row" spacing={2} margin={3}>
      <Avatar
        sizes="large"
        alt={props.displayName}
        src={props.photoUrl}
      ></Avatar>
      <Typography variant="h4" color="black">
        {props.displayName}
      </Typography>
      <Button variant="outlined">編集</Button>
    </Stack>
  );
};
