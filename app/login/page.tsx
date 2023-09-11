import * as React from "react";
import { Button, Typography, Stack, TextField, Container } from "@mui/material";

export default function LoginPage() {
  return (
    <Container className="content" fixed>
      <Typography variant="h4" color="secondary">
        Login
      </Typography>
      <Stack spacing={2} margin={3} marginLeft={10} className="button-group">
        <Stack spacing={2} margin={3}>
          <TextField label="Email" />
          <TextField label="Password" />
          <Button variant="outlined">ログイン</Button>
        </Stack>

        <Typography variant="h4" color="secondary">
          Sign Up
        </Typography>
        <Stack spacing={2} margin={3} className="button-group">
          <Button variant="outlined">メール</Button>
          <Button variant="outlined">Google</Button>
          <Button variant="outlined">Twitter</Button>
          <Button variant="outlined">Facebook</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
