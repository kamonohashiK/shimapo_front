import { useAppDispatch } from "@/app/_store/hooks";
import { hideDialog } from "@/app/_store/dialogSlice";
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
import ImageUploadForm from "../dialog_contents/img_upload_form";
import NewQuestionForm from "../dialog_contents/new_question_form";
import dialogTypes from "@/app/_constants/dialog_types";
import AuthForm from "../dialog_contents/auth_form";

export default function CommonDialog() {
  const dispatch = useAppDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog);

  return (
    <Dialog
      maxWidth={"md"}
      open={dialogState.isShown}
      onClose={() => dispatch(hideDialog())}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}></DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => dispatch(hideDialog())}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {(() => {
          switch (dialogState.type) {
            case dialogTypes.IMAGE_UPLOAD_FORM:
              return <ImageUploadForm />;
            case dialogTypes.NEW_QUESTION_FORM:
              return <NewQuestionForm />;
            case dialogTypes.AUTH_FORM:
              return <AuthForm />;
            default:
              return <Typography paragraph>Error</Typography>;
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
