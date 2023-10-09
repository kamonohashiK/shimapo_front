"use client";
import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";

export default function MyPage() {
  //TODO: マイページアクセス時に左サイドバーの状態を切り替えるようにする

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} id="content">
        <Container className="content" fixed>
          <Typography variant="h4" color="secondary">
            My Page
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
