"use client";
import * as React from "react";
import IslandsMap from "../_components/islands_map";
import Sidebar from "../_components/sidebar/sidebar";
import Grid from "@mui/material/Grid";

export default function Home() {
  const sidebarTitle = "テスト2";
  const sidebarText = "最初のページ";

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={8} >
        <IslandsMap />
      </Grid>
    </Grid>
  );
}
