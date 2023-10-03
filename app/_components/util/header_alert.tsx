import { RootState } from "@/app/_store/store";
import { Collapse, Alert } from "@mui/material";
import { useSelector } from "react-redux";

export default function HeaderAlert() {
    const alertInfo = useSelector((state: RootState) => state.alert);

    return (
        <Collapse in={alertInfo.isShown} sx={{ position: "absolute", width: "63%" }}>
            <Alert severity={alertInfo.severity}>
                {alertInfo.message}
            </Alert>
        </Collapse>
    );
}