'use client';
import React from "react";
import clsx from "clsx";
import { Button, Typography, Stack, TextField, Container } from "@mui/material";
import { styled, Box, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  return (
    <Container className="content" fixed>
      <Typography variant="h4" color="secondary">
        Login
      </Typography>
      <Stack spacing={2} margin={3} marginLeft={10} className="button-group">
        <Stack spacing={2} margin={3}>
          <TextField label="Email" />
          <TextField label="Password" />
          <Button variant="outlined">ログイン</Button>
        </Stack>

        <Typography variant="h4" color="secondary">
          Sign Up
        </Typography>
        <Stack spacing={2} margin={3} className="button-group">
          <TriggerButton type="button" onClick={modalOpen}>
            メール
          </TriggerButton>
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
          <Button variant="outlined">Google</Button>
          <Button variant="outlined">Twitter</Button>
          <Button variant="outlined">Facebook</Button>
        </Stack>
      </Stack>
    </Container>
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

const TriggerButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }
  `
);