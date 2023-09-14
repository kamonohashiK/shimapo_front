"use client";
import * as React from "react";
import IslandsMap from "./components/islands_map";
import Sidebar from "./components/sidebar";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} id="content">
        <IslandsMap />
      </Grid>
    </Grid>
  );
}
