import { setAlert, hideAlert } from "@/app/_store/alertSlice";
import { useAppDispatch } from "@/app/_store/hooks";
import { hideModal } from "@/app/_store/modalSlice";
import { RootState } from "@/app/_store/store";
import { Box, Stack, Button, Typography, styled, Modal, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";

//TODO: modalの中身をpropsで渡せるようにする
export default function CommonModal() {
    const dispatch = useAppDispatch();
    const modalState = useSelector((state: RootState) => state.modal);

    return (
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
    );
}

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
