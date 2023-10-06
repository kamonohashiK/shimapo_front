"use client";
import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";
import EmailSignupForm from "@/app/_components/form/email_signup";
import HeaderAlert from "@/app/_components/util/header_alert";

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
          <HeaderAlert />
          <Typography variant="h4" color="secondary">
            Sign Up
          </Typography>
          <EmailSignupForm />
        </Container>
      </Grid>
    </Grid>
  );
}
