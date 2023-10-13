"use client";
import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import Sidebar from "../../_components/sidebar/sidebar";
import { IslandCollection } from "@/app/_api/collections/island";

export default function MyPage() {
  //TODO: マイページアクセス時に左サイドバーの状態を切り替えるようにする

  async function onClick() {
    const island = new IslandCollection("EHM_KMJ_UOSHIMA");
    console.log(await island.getData());
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} id="content">
        <Container className="content" fixed>
          <Typography variant="h4" color="secondary">
            My Page
            <Button onClick={onClick}>ほげ</Button>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
