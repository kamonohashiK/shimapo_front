"use client";
import Sidebar from "@/app/_components/sidebar/sidebar";
import { Grid, Typography, Container } from "@mui/material";
import React from "react";
import HeaderAlert from "@/app/_components/util/header_alert";
import CommonModal from "@/app/_components/util/common_modal";
import DonationForm from "@/app/_components/form/donation";

export default function DonatePage() {
  const sidebarTitle = "寄付をする";
  const sidebarText = "寄付を促す文言";

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={8} id="content">
        <Container className="content" fixed>
          <HeaderAlert />

          <Typography variant="h4" color="secondary">
            Donate
          </Typography>

          <DonationForm />
          <CommonModal />
        </Container>
      </Grid>
    </Grid>
  );
}

