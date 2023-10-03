"use client";
import Sidebar from "@/app/_components/sidebar/sidebar";
import { useAppDispatch } from "@/app/_store/hooks";
import { Grid, Typography, Container, TextField, Box, Radio, FormControl, RadioGroup, FormControlLabel, FormLabel, Button } from "@mui/material";
import React from "react";
import { showModal } from "@/app/_store/modalSlice";
import HeaderAlert from "@/app/_components/util/header_alert";
import CommonModal from "@/app/_components/util/common_modal";

export default function DonatePage() {
  const dispatch = useAppDispatch();

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

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="お名前(ニックネーム可)"
                required
                id="name"
                defaultValue=""
              />
            </div>
            <div>
              <TextField
                label="メールアドレス"
                required
                id="email"
                defaultValue=""
              />
            </div>
            <FormControl>
              <FormLabel id="amount">金額</FormLabel>
              <RadioGroup
                row
                aria-labelledby="amount"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="100"
                  control={<Radio />}
                  label="￥100"
                />
                <FormControlLabel
                  value="500"
                  control={<Radio />}
                  label="￥500"
                />
                <FormControlLabel
                  value="1000"
                  control={<Radio />}
                  label="￥1,000"
                />
                <FormControlLabel
                  value="5000"
                  control={<Radio />}
                  label="￥5,000"
                />
              </RadioGroup>
            </FormControl>
            <div>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => dispatch(showModal())}
              >
                確認
              </Button>
            </div>
          </Box>
          <CommonModal />
        </Container>
      </Grid>
    </Grid>
  );
}

