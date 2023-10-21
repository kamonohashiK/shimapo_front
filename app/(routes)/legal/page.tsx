import { PrivacyPolicy } from "@/app/_components/legal/privacy_policy";
import { TermsOfUse } from "@/app/_components/legal/terms_of_use";
import Sidebar from "@/app/_components/sidebar/_";
import { Container, Divider, Grid, Typography } from "@mui/material";

export default function LegalPage() {
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
}
