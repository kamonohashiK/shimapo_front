import { Grid } from "@mui/material";
import CustomImageList from "../../main_contents/image_list/_";
import IslandsMap from "../../main_contents/islands_map";

interface Props {
  isMap: boolean;
  googleMapApiKey: string;
}

export const TopPageMobile = (props: Props) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        {props.isMap ? (
          <IslandsMap apiKey={props.googleMapApiKey} />
        ) : (
          <CustomImageList />
        )}
      </Grid>
    </Grid>
  );
};
