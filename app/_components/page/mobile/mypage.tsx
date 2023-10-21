import { Container, Grid } from "@mui/material";
import { NotificationTab } from "../../mypage/notification_tab";
import { UserProfile } from "../../mypage/user_profile/_";
import { UserStats } from "../../mypage/user_stats/_";

export const MypageMobile = () => {
  return (
    <Container sx={{ maxHeight: "100vh", overflowY: "hidden" }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} id="content">
          <Container fixed>
            <UserProfile />
            <UserStats />
            <NotificationTab />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
