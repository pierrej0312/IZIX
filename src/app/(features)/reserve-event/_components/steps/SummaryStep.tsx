"use client";

import * as React from "react";
import { Box, Button, Paper, Stack, Typography, Divider } from "@mui/material";
import Lottie from "lottie-react";
import { useLottieJson } from "@/shared/hooks/useLottieJson";

import { EventDraft, AiResult, StrategyKey } from "../../_lib/types";

type Props = {
  event: EventDraft;
  ai: AiResult;
  strategy: StrategyKey;
  onBackHome: () => void;
  onCreateAnother: () => void;
};

export default function SummaryStep({
  event,
  ai,
  strategy,
  onBackHome,
  onCreateAnother,
}: Props) {
  const { data: animData } = useLottieJson("/lottie/event-created.json");

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Stack spacing={4} sx={{ width: "100%", maxWidth: 720 }} alignItems="center">
        {/* Animation */}
        <Box sx={{ width: 240, height: 240 }}>
          {animData ? <Lottie animationData={animData} loop={false} /> : null}
        </Box>

        {/* Title */}
        <Typography variant="h4" fontWeight={800} textAlign="center">
          Event parking successfully prepared
        </Typography>

        <Typography color="text.secondary" textAlign="center">
          Guest parking capacity has been reserved and optimized based on real-world
          signals and AI prediction.
        </Typography>

        {/* Summary */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: 3,
            borderRadius: 3,
            border: "1px solid rgba(18,45,61,0.08)",
          }}
        >
          <Stack spacing={2}>
            <Typography fontWeight={700}>Event summary</Typography>
            <Divider />

            <SummaryRow label="Event" value={event.eventName} />
            <SummaryRow label="Type" value={event.eventType.replace("_", " ")} />
            <SummaryRow label="Date" value={`${event.date} • ${event.timeSlot}`} />
            <SummaryRow label="Guests expected" value={`${event.guests}`} />

            <Divider />

            <SummaryRow label="Estimated cars" value={`${ai.estimatedCars}`} />
            <SummaryRow label="Reserved guest spots" value={`${ai.recommendedSpots}`} />
            <SummaryRow
              label="Strategy applied"
              value={strategy}
              highlight
            />
          </Stack>
        </Paper>

        {/* Actions */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" size="large" onClick={onBackHome}>
            Back to dashboard
          </Button>
          <Button variant="outlined" size="large" onClick={onCreateAnother}>
            Create another event
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={highlight ? 800 : 600}>
        {value}
      </Typography>
    </Box>
  );
}
