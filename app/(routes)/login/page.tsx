"use client";
import { Typography, Container, Grid, Stack } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";
import HeaderAlert from "@/app/_components/header/header_alert";
import GoogleAuthButton from "@/app/_components/auth/google_auth_button";

export default function LoginPage() {
  const sidebarTitle = "ログイン";
  const sidebarText = "ログインを促す文言";

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={8} id="content">
        <Container className="content" fixed>
          <Typography variant="h4" color="secondary">
            Sign Up
          </Typography>
          <Stack spacing={2} margin={3}>
            <GoogleAuthButton />
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
