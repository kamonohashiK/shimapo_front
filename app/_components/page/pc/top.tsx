import { Grid } from "@mui/material";
import CustomImageList from "../../main_contents/image_list/_";
import IslandsMap from "../../main_contents/islands_map";
import Sidebar from "../../sidebar/_";

interface Props {
  isMap: boolean;
  googleMapApiKey: string;
}

export const TopPagePC = (props: Props) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={8}>
        {props.isMap ? (
          <IslandsMap apiKey={props.googleMapApiKey} isMobile={false} />
        ) : (
          <CustomImageList />
        )}
      </Grid>
    </Grid>
  );
};
