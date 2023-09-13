import { Stack, Button, Typography, TextField } from "@mui/material";
import React from "react";
import { styled, Box, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import clsx from "clsx";

export default function MailAuthButton() {
    const [open, setOpen] = React.useState(false);
    const modalOpen = () => setOpen(true);
    const modalClose = () => setOpen(false);

    return (
      <>
        <Button type="button" variant="outlined" onClick={modalOpen}>
          メール
        </Button>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={modalClose}
          slots={{ backdrop: StyledBackdrop }}
        >
          <Box sx={style}>
            <Stack spacing={2} margin={3}>
              <Button onClick={modalClose}>X</Button>
              <Typography paragraph>
                有効化メールが送信される旨の文言
              </Typography>
              <TextField label="Email" />
              <Button variant="outlined">送信</Button>
            </Stack>
          </Box>
        </StyledModal>
      </>
    );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

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

const style = (theme: Theme) => ({
  width: 400,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});

