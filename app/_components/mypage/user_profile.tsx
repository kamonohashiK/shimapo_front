import { Avatar, Button, Stack, Typography } from "@mui/material";

export const UserProfile = () => {
    return (
      <Stack direction="row" spacing={2} margin={3}>
        <Avatar sizes="large"></Avatar>
        <Typography variant="h4" color="black">
          User Profile
        </Typography>
        <Button variant="outlined">編集</Button>
      </Stack>
    );
}