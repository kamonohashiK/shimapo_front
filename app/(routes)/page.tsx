"use client";
import * as React from "react";
import IslandsMap from "../components/islands_map";
import Sidebar from "../components/sidebar";
import Grid from "@mui/material/Grid";

export default function Home() {
  const sidebarTitle = "ようこそ";
  const sidebarText = "最初のページ";

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={3}>
        <Sidebar title={sidebarTitle} content={sidebarText} />
      </Grid>
      <Grid item xs={9} id="content">
        <IslandsMap />
      </Grid>
    </Grid>
  );
}
