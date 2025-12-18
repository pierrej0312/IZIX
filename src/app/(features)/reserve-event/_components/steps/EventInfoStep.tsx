"use client";

import * as React from "react";
import {
    Box,
    InputAdornment,
    MenuItem,
    Paper,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { EventDraft, EventType, TimeSlot } from "../../_lib/types";
import { PARKINGS } from "../../_lib/parkingCatalog";

const EVENT_TYPES: { value: EventType; label: string }[] = [
    { value: "conference", label: "Conference" },
    { value: "board_meeting", label: "Board meeting" },
    { value: "training", label: "Training" },
    { value: "client_meeting", label: "Client meeting (B2B)" },
    { value: "vip", label: "VIP / Executive" },
];

const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
];

export default function EventInfoStep({
    value,
    onChange,
    isMobile,
}: {
    value: EventDraft;
    onChange: (next: EventDraft) => void;
    isMobile: boolean;
}) {
    const update = <K extends keyof EventDraft>(key: K, nextValue: EventDraft[K]) =>
        onChange({ ...value, [key]: nextValue });

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                Event Informations
            </Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Event name"
                        placeholder="Customer meeting, workshop, board meeting..."
                        value={value.eventName}
                        onChange={(e) => update("eventName", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} />

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Event type"
                        select
                        value={value.eventType}
                        onChange={(e) => update("eventType", e.target.value as any)}
                    >
                        {EVENT_TYPES.map((t) => (
                            <MenuItem key={t.value} value={t.value}>
                                {t.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Parking"
                        select
                        value={value.parkingId}
                        onChange={(e) => update("parkingId", e.target.value as any)}
                    >
                        {PARKINGS.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name} • {p.capacity.guestZone} guest / {p.capacity.employeeZone} employee
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>


                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={value.date}
                        onChange={(e) => update("date", e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarMonthIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Time slot"
                        placeholder="Customer meeting, workshop, board meeting..."
                        value={value.timeSlot}
                        select
                        onChange={(e) => update("timeSlot", e.target.value as any)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccessTimeIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {TIME_SLOTS.map((t) => (
                            <MenuItem key={t.value} value={t.value}>
                                {t.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Guests estimation
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ flex: 1, px: 1 }}>
                                <Slider
                                    value={value.guests}
                                    onChange={(_, v) => update("guests", v as number)}
                                    min={0}
                                    max={56}
                                    valueLabelDisplay="on"
                                    sx={{
                                        "& .MuiSlider-valueLabel": {
                                            backgroundColor: "#fff",
                                            border: "1px solid rgba(18,45,61,0.15)",
                                            color: "text.primary",
                                            borderRadius: 2,
                                            boxShadow: "none",
                                        },
                                        "& .MuiSlider-rail": {
                                            opacity: 1,
                                            backgroundColor: "rgba(18,45,61,0.25)",
                                        },
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: -0.5,
                                        color: "text.secondary",
                                        fontSize: 12,
                                    }}
                                >
                                    <span>0</span>
                                    <span>56</span>
                                </Box>
                            </Box>
                            <Paper
                                elevation={0}
                                sx={{
                                    width: 56,
                                    height: 40,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: 2.5,
                                    border: "1px solid rgba(18,45,61,0.10)",
                                    bgcolor: "#fff",
                                }}
                            >
                                <Typography fontWeight={700}>{value.guests}</Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
