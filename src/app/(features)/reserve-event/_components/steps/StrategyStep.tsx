"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import type { AiResult, StrategyKey } from "../../_lib/types";
import { buildStrategies } from "../../_lib/strategy";

function StrategyIcon({ k }: { k: StrategyKey }) {
  if (k === "safe") return <ShieldOutlinedIcon sx={{ fontSize: 42 }} />;
  if (k === "balanced") return <TuneOutlinedIcon sx={{ fontSize: 42 }} />;
  return <GppBadOutlinedIcon sx={{ fontSize: 42 }} />;
}

export default function StrategyStep({
  ai,
  selected,
  onSelect,
  onBack,
  onConfirm,
}: {
  ai: AiResult;
  selected: StrategyKey;
  onSelect: (k: StrategyKey) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const { cards, impacts, recommendedKey } = React.useMemo(() => buildStrategies(ai), [ai]);
  const impact = impacts[selected];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ textAlign: "center", mb: 4 }}>
        Select you reservation strategy
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 220px)" },
          justifyContent: "center",
          gap: 3,
          mb: 3,
        }}
      >
        {cards.map((c) => {
          const isSelected = c.key === selected;

          return (
            <Paper
              key={c.key}
              elevation={0}
              onClick={() => onSelect(c.key)}
              role="button"
              tabIndex={0}
              sx={{
                borderRadius: 3,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                border: isSelected
                  ? "2px solid rgba(118,236,204,0.95)"
                  : "1px solid rgba(18,45,61,0.12)",
                bgcolor: isSelected ? "primary.main" : "#fff",
                transition: "transform 140ms ease",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <Box sx={{ color: isSelected ? "#122D3D" : "primary.main", mb: 1 }}>
                <StrategyIcon k={c.key} />
              </Box>

              <Typography variant="h6" fontWeight={800} sx={{ color: "#122D3D" }}>
                {c.label}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Priority to the guests
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography sx={{ lineHeight: 1 }}>
                  <Box component="span" sx={{ fontSize: 26, fontWeight: 900, color: "#122D3D" }}>
                    {c.spots}
                  </Box>{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "#122D3D" }}>
                    Spots
                  </Box>
                </Typography>
              </Box>

              {c.key === recommendedKey && (
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label="Recommended"
                    sx={{
                      bgcolor: "#fff",
                      border: "1px solid rgba(18,45,61,0.12)",
                      fontWeight: 700,
                    }}
                  />
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* Impact panel */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid rgba(18,45,61,0.08)",
          bgcolor: "rgba(18,45,61,0.03)",
        }}
      >
        <Typography fontWeight={800} sx={{ mb: 2 }}>
          Impact:&nbsp;
          <Box component="span" sx={{ color: "primary.main", fontWeight: 900 }}>
            {selected === "safe" ? "Safe" : selected === "balanced" ? "Balanced" : "Aggressive"}
          </Box>
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 3 }}>
          {/* Occupancy + signals */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" fontWeight={700}>
                Total parking occupancy
              </Typography>
              <Typography variant="body2" fontWeight={800}>
                {impact.predictedPeakOccupancyPct}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={impact.predictedPeakOccupancyPct}
              sx={{
                height: 16,
                borderRadius: 999,
                bgcolor: "rgba(18,45,61,0.12)",
                "& .MuiLinearProgress-bar": { borderRadius: 999 },
              }}
            />

            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <ThunderstormOutlinedIcon sx={{ color: "primary.main" }} />
                <Typography variant="body2" fontWeight={700}>
                  Rain{" "}
                  <Box component="span" sx={{ color: "primary.main", fontWeight: 900 }}>
                    {impact.signals[0].highlight}
                  </Box>{" "}
                  <Box component="span" color="text.secondary">
                    {impact.signals[0].suffix}
                  </Box>
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <InfoOutlinedIcon sx={{ color: "primary.main" }} />
                <Typography variant="body2" fontWeight={700}>
                  School Holidays{" "}
                  <Box component="span" sx={{ color: "primary.main", fontWeight: 900 }}>
                    {impact.signals[1].highlight}
                  </Box>{" "}
                  <Box component="span" color="text.secondary">
                    {impact.signals[1].suffix}
                  </Box>
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Zones */}
          <Stack spacing={2}>
            <ZoneCard
              title="Zone Guest"
              level={impact.guestZone.level}
              zone={impact.guestZone.zone}
              available={impact.guestZone.available}
              take={impact.guestZone.take}
            />
            <ZoneCard
              title="Zone Employee"
              level={impact.employeeZone.level}
              zone={impact.employeeZone.zone}
              available={impact.employeeZone.available}
              take={impact.employeeZone.take}
            />
          </Stack>
        </Box>
      </Paper>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={onBack} sx={{ px: 3 }}>
          Previous
        </Button>
        <Button variant="contained" onClick={onConfirm} sx={{ px: 3 }}>
          Confirm selection
        </Button>
      </Stack>
    </Box>
  );
}

function ZoneCard({
  title,
  level,
  zone,
  available,
  take,
}: {
  title: string;
  level: string;
  zone: string;
  available: number;
  take: number;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(18,45,61,0.10)",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="body2" fontWeight={800}>
          {title}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip label={`Level ${level}`} size="small" sx={{ bgcolor: "rgba(18,45,61,0.06)" }} />
          <Chip label={`Zone ${zone}`} size="small" sx={{ bgcolor: "rgba(18,45,61,0.06)" }} />
        </Stack>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" fontWeight={700}>
          {available} parking spaces available
        </Typography>

        <Chip
          label={`take ${take} spots`}
          sx={{
            bgcolor: "rgba(18,45,61,0.06)",
            fontWeight: 800,
          }}
        />
      </Box>
    </Paper>
  );
}
