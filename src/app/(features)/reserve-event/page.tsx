import { Container, Box } from "@mui/material";
import ReserveEventWizard from "./_components/ReserveEventWizard";

export default function ReserveEventPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 3, md: 6 } }}>
        <ReserveEventWizard />
      </Box>
    </Container>
  );
}
