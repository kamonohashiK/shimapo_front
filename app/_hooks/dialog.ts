import {
  showDialog as showDialogAction,
  hideDialog as hideDialogAction,
  toggleDisabled as toggleDisabledAction,
} from "@/app/_store/slices/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";

export const useDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state: RootState) => state.dialog);

  const showDialog = (dialogType: string) => {
    dispatch(
      showDialogAction({ isShown: true, type: dialogType, disabled: false })
    );
  };

  const hideDialog = () => {
    dispatch(hideDialogAction());
  };

  const toggleDisabled = () => {
    dispatch(toggleDisabledAction());
  };

  return { dialog, showDialog, hideDialog, toggleDisabled };
};
