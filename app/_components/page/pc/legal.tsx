import { Container, Grid, Divider, Typography } from "@mui/material";
import { PrivacyPolicy } from "../../legal/privacy_policy";
import { TermsOfUse } from "../../legal/terms_of_use";
import Sidebar from "../../sidebar/_";

export const LegalPagePC = () => {
  return (
    <Container sx={{ maxHeight: "100vh" }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} id="content">
          <Container fixed>
            <TermsOfUse />
            <Divider sx={{ margin: 2 }} />
            <PrivacyPolicy />
            <Typography paragraph>©️ 2023 Kouki Kadoya</Typography>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
