"use client";
import Sidebar from "@/app/_components/sidebar/sidebar";
import { useAppDispatch } from "@/app/_store/hooks";
import { Grid, Typography, Container, TextField, Box, Radio, FormControl, RadioGroup, FormControlLabel, FormLabel, Button, Modal, Backdrop, Stack, styled } from "@mui/material";
import React from "react";
import { setAlert, hideAlert } from "@/app/_store/alertSlice";
import { showModal, hideModal } from "@/app/_store/modalSlice";
import HeaderAlert from "@/app/_components/util/header_alert";
import { RootState } from "@/app/_store/store";
import { useSelector } from "react-redux";

export default function DonatePage() {
  // モーダルの開閉
  const modalState = useSelector((state: RootState) => state.modal);

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

          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={modalState.isShown}
            onClose={() => dispatch(hideModal())}
            slots={{ backdrop: StyledBackdrop }}
          >
            <Box sx={style}>
              <Stack spacing={2} margin={3}>
                <Button onClick={() => dispatch(hideModal())}>X</Button>
                <Typography paragraph>
                  以下の内容で寄付をします。よろしいですか？
                </Typography>
                <Typography paragraph>お名前：〇〇</Typography>
                <Typography paragraph>金額：〇〇</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(hideModal());

                    // 成功時のアラート
                    dispatch(
                      setAlert({
                        message: "寄付を受け付けました！ありがとうございます！",
                        severity: "success",
                        isShown: true,
                      })
                    );
                    // エラー時のアラート
                    /**
                    dispatch(
                      setAlert({
                        message: "寄付の受付処理中にエラーが発生しました。",
                        severity: "error",
                        isShown: true,
                      })
                    );
                     */

                    // 5秒後にアラートを閉じる
                    setTimeout(() => {
                      dispatch(hideAlert());
                    }, 5000);
                  }}
                >
                  寄付をする
                </Button>
              </Stack>
            </Box>
          </StyledModal>
        </Container>
      </Grid>
    </Grid>
  );
}

const blue = {
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = () => ({
  width: 400,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: "white",
  boxShadow: `0px 2px 24px ${"#383838"}`,
});
