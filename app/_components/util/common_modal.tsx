import { useAppDispatch } from "@/app/_store/hooks";
import { hideModal } from "@/app/_store/modalSlice";
import { RootState } from "@/app/_store/store";
import { Box, Stack, Button, Typography, styled, Modal, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import ImageUploadForm from "../modal_contents/img_upload_form";
import NewQuestionForm from "../modal_contents/new_question_form";
import modalTypes from "@/app/_constants/modal_types";

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
            {/* モーダルを閉じるボタンは共通 */}
            <Button onClick={() => dispatch(hideModal())}>X</Button>
            {/* modalState.typeによって表示するコンポーネントを入れ替え */}
            {(() => {
              switch (modalState.type) {
                case modalTypes.IMAGE_UPLOAD_FORM:
                  return <ImageUploadForm />;
                case modalTypes.NEW_QUESTION_FORM:
                  return <NewQuestionForm />;
                default:
                  return <Typography paragraph>Error</Typography>;
              }
            })()}
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
