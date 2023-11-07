import { RootState } from "@/app/_store/store";
import {
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploadForm from "./dialog_contents/img_upload_form";
import NewQuestionForm from "./dialog_contents/new_question_form";
import dialogTypes from "@/app/_constants/dialog_types";
import AuthForm from "./dialog_contents/auth_form";
import { useDialog } from "@/app/_hooks/dialog";
import AnswerForm from "./dialog_contents/answer_form";

export default function CommonDialog() {
  const dialogState = useSelector((state: RootState) => state.dialog);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const { hideDialog } = useDialog();

  // ログインが必要なアクション
  const authRequiredActions = [
    dialogTypes.IMAGE_UPLOAD_FORM,
    dialogTypes.NEW_QUESTION_FORM,
    dialogTypes.ANSWER_FORM,
  ];

  return (
    <Dialog
      fullWidth
      open={dialogState.isShown}
      onClose={() => hideDialog()}
      sx={{ overflow: "auto" }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}></DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => hideDialog()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        disabled={dialogState.disabled}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {(() => {
          // ログインが必要なアクションの場合はログインしているかチェック
          return authRequiredActions.includes(dialogState.type) &&
            !isLoggedIn ? (
            <AuthForm />
          ) : (
            getDialogContent(dialogState.type)
          );
        })()}
      </DialogContent>
    </Dialog>
  );
}

// dialogTypeに応じて表示するコンテンツを切り替える
function getDialogContent(dialogType: string) {
  switch (dialogType) {
    case dialogTypes.IMAGE_UPLOAD_FORM:
      return <ImageUploadForm />;
    case dialogTypes.NEW_QUESTION_FORM:
      return <NewQuestionForm />;
    case dialogTypes.ANSWER_FORM:
      return <AnswerForm />;
    case dialogTypes.AUTH_FORM:
      return <AuthForm />;
    default:
      return <Typography paragraph>Error</Typography>;
  }
}
