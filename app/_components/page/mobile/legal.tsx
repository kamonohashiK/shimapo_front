import { Container, Grid, Divider, Typography } from "@mui/material";
import { PrivacyPolicy } from "../../legal/privacy_policy";
import { TermsOfUse } from "../../legal/terms_of_use";

export const LegalPageMobile = () => {
  return (
    <Container sx={{ maxHeight: "100vh" }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} id="content">
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
