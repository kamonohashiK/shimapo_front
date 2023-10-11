import {
  hideAlert as hideAlertAction,
  setAlert as setAlertAction,
} from "@/app/_store/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";

export const useAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);

  const showAlert = (
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined
  ) => {
    dispatch(
      setAlertAction({
        message: message,
        severity: severity,
        isShown: true,
      })
    );

    setTimeout(() => {
      dispatch(hideAlertAction());
    }, 5000);
  };

  return { alert, showAlert };
};
