import {
  showDialog as showDialogAction,
  hideDialog as hideDialogAction,
} from "@/app/_store/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";

export const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state: RootState) => state.dialog);

  const showDialog = (dialogType: string) => {
    dispatch(showDialogAction({ isShown: true, type: dialogType }));
  };

  const hideDialog = () => {
    dispatch(hideDialogAction());
  };

  return { dialog, showDialog, hideDialog };
};
