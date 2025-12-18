"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 10 }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h3" fontWeight={700}>
            Smart Guest Pool
          </Typography>
          <Typography color="text.secondary">
            Reserve the right amount of guest parking spots for an event, without knowing who will arrive by car.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/reserve-event")}
          >
            Reserve parking for an event
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
