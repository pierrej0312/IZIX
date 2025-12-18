"use client";

import * as React from "react";
import { Box, LinearProgress, Typography, Stack, Paper } from "@mui/material";
import Lottie from "lottie-react";
import { useLottieJson } from "@/shared/hooks/useLottieJson";
import { EventDraft, AiResult } from "../../_lib/types";
import { getParkingById } from "../../_lib/parkingCatalog";



type TaskKey = "weather" | "holidays" | "parking" | "ai";

type Task = {
    key: TaskKey;
    title: string;
    weight: number; // contribution to progress
};

const LOTTIE_PATH_BY_TASK: Record<TaskKey, string> = {
    weather: "/lottie/weather.json",
    holidays: "/lottie/holidays.json",
    parking: "/lottie/parking.json",
    ai: "/lottie/ai.json",
};

const TASKS: Task[] = [
    { key: "weather", title: "Collecting weather datas", weight: 25 },
    { key: "holidays", title: "Checking holidays & workforce context", weight: 20 },
    { key: "parking", title: "Loading parking occupancy & historical patterns", weight: 25 },
    { key: "ai", title: "Generating AI recommendation (LLM)", weight: 30 },
];

type PipelinePayload = {
    event: EventDraft;
    weather: any;
    holidays: any;
    parking: any;
    ai: any;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
}

export default function ComputeStep({
    event,
    onDone,
}: {
    event: EventDraft;
    onDone: (result: AiResult, raw: PipelinePayload) => void;
}) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(3);
    const [doneKeys, setDoneKeys] = React.useState<Set<TaskKey>>(new Set());
    const [statusText, setStatusText] = React.useState(`${TASKS[0].title}...`);
    const progressRef = React.useRef(3);

    const activeTask = TASKS[Math.min(activeIndex, TASKS.length - 1)];

    const path = LOTTIE_PATH_BY_TASK[activeTask.key];
    const { data: animData } = useLottieJson(path);

    React.useEffect(() => {
        progressRef.current = progress;
    }, [progress]);

    React.useEffect(() => {
        let mounted = true;
        const progressRef = { current: 3 };

        const smoothTo = (target: number, durationMs = 700) =>
            new Promise<void>((resolve) => {
                const start = progressRef.current;
                const end = clamp(target, 0, 100);
                const startTime = performance.now();

                const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

                const step = (now: number) => {
                    if (!mounted) return;

                    const elapsed = now - startTime;
                    const t = clamp(elapsed / durationMs, 0, 1);
                    const eased = easeOutCubic(t);

                    const next = start + (end - start) * eased;
                    const monotonic = Math.max(progressRef.current, next);

                    progressRef.current = monotonic;
                    setProgress(Math.round(monotonic));

                    if (t < 1) requestAnimationFrame(step);
                    else resolve();
                };

                requestAnimationFrame(step);
            });


        const markDone = (key: TaskKey) => {
            setDoneKeys((prev) => new Set(prev).add(key));
        };

        const run = async () => {
            setActiveIndex(0);
            setStatusText(`${TASKS[0].title}...`);
            await smoothTo(18);
            const parkingRef = getParkingById(event.parkingId);
            const weather = await fetch(
                `/reserve-event/api/weather?lat=${parkingRef.lat}&lng=${parkingRef.lng}&date=${event.date}&timeSlot=${event.timeSlot}`,
                { cache: "no-store" }
            ).then((r) => r.json());

            markDone("weather");
            await smoothTo(25);

            setActiveIndex(1);
            setStatusText(`${TASKS[1].title}...`);
            await smoothTo(38);
            const holidays = await fetch(`/reserve-event/api/holidays?date=${event.date}`, {
                cache: "no-store",
            }).then((r) => r.json());
            markDone("holidays");
            await smoothTo(45);

            setActiveIndex(2);
            setStatusText(`${TASKS[2].title}...`);
            await smoothTo(62);
            const parking = await fetch(
                `/reserve-event/api/parking-history?parkingId=${parkingRef.id}`,
                { cache: "no-store" }
            ).then((r) => r.json());
            markDone("parking");
            await smoothTo(72);

            setActiveIndex(3);
            setStatusText(`${TASKS[3].title}...`);
            await smoothTo(90);
            const ai = await fetch(`/reserve-event/api/api-recommendation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ event, weather, holidays, parking }),
            }).then((r) => r.json());
            markDone("ai");

            await smoothTo(100, 450);
            if (!mounted) return;

            setStatusText("Recommendation ready ✓");
            onDone(ai as AiResult, { event, weather, holidays, parking, ai });
        };

        const ready =
            event.eventName.trim() &&
            event.eventType &&
            event.date &&
            event.timeSlot &&
            Number.isFinite(event.guests);

        if (ready) run();

        return () => {
            mounted = false;
        };
    }, [event.eventName, event.eventType, event.date, event.timeSlot, event.guests]);

    return (
        <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
            <Stack spacing={3} alignItems="center" sx={{ width: "100%", maxWidth: 900 }}>
                <Box sx={{ width: 220, height: 220 }}>
                    {animData ? <Lottie animationData={animData} loop /> : null}
                </Box>

                <Typography fontWeight={700}>{statusText}</Typography>

                <Box sx={{ width: "100%" }}>
                    <LinearProgress
                        variant="determinate"
                        value={clamp(progress, 0, 100)}
                        sx={{
                            height: 14,
                            borderRadius: 999,
                            bgcolor: "rgba(18,45,61,0.08)",
                            "& .MuiLinearProgress-bar": { borderRadius: 999 },
                        }}
                    />
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        p: 2,
                        borderRadius: 3,
                        border: "1px solid rgba(18,45,61,0.06)",
                        bgcolor: "rgba(18,45,61,0.03)",
                    }}
                >
                    <Stack spacing={1}>
                        {TASKS.map((t, idx) => {
                            const isActive = idx === activeIndex;
                            const isDone = doneKeys.has(t.key);
                            return (
                                <Typography
                                    key={t.key}
                                    variant="body2"
                                    color={isActive ? "text.primary" : "text.secondary"}
                                    sx={{ opacity: isActive ? 1 : 0.75, fontWeight: isActive ? 700 : 500 }}
                                >
                                    {isDone ? "✓ " : isActive ? "• " : "  "}
                                    {t.title}
                                    {isActive && !isDone ? "..." : ""}
                                </Typography>
                            );
                        })}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}
