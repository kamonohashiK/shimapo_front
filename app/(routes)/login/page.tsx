"use client";
import React from "react";
import {
  Button,
  Typography,
  Stack,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";

export default function LoginPage() {
  const sidebarTitle = "ログイン";
  const sidebarText = "ログインを促す文言";

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={3}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={9} id="content">
        <Container className="content" fixed>
          <Typography variant="h4" color="secondary">
            Login
          </Typography>
          <Stack
            spacing={2}
            margin={3}
            marginLeft={10}
            className="button-group"
          >
            <Typography variant="h4" color="secondary">
              Sign Up
            </Typography>
            <Stack spacing={2} margin={3}>
              <TextField label="Email" />
              <Button variant="outlined">ログイン</Button>
            </Stack>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
