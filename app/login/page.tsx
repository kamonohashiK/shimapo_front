'use client';
import React from "react";
import { Button, Typography, Stack, TextField, Container } from "@mui/material";
import GoogleAuthButton from "../components/google_auth_button";
import MailAuthButton from "../components/mail_auth_button";

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
          <MailAuthButton />
          <GoogleAuthButton />
          <Button variant="outlined">Twitter</Button>
          <Button variant="outlined">Facebook</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

