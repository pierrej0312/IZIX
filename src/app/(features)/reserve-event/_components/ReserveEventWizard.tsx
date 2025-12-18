"use client";

import * as React from "react";
import {
    Box,
    Button,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import {
    DEFAULT_EVENT,
    WIZARD_STEPS,
    WizardStepIndex,
    EventDraft,
    AiResult,
    StrategyKey,
} from "../_lib/types";

import { uiTokens } from "@/shared/ui/theme";

import EventInfoStep from "./steps/EventInfoStep";
import ComputeStep from "./steps/ComputeStep";
import StrategyStep from "./steps/StrategyStep";
import SummaryStep from "./steps/SummaryStep";
import { useRouter } from "next/navigation";

export default function ReserveEventWizard() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [activeStep, setActiveStep] = React.useState<WizardStepIndex>(0);
    const [eventDraft, setEventDraft] = React.useState<EventDraft>(DEFAULT_EVENT);

    const [aiResult, setAiResult] = React.useState<AiResult | null>(null);
    const [computeMode, setComputeMode] = React.useState<"idle" | "loading" | "ready">("idle");

    const [selectedStrategy, setSelectedStrategy] = React.useState<StrategyKey>("balanced");

    const isComputing = activeStep === 1 && computeMode === "loading";

    const canCompute =
        eventDraft.eventName.trim().length > 0 &&
        eventDraft.eventType !== "" &&
        eventDraft.date !== "" &&
        eventDraft.timeSlot !== "" &&
        eventDraft.parkingId !== "";
    const startCompute = () => {
        if (!canCompute) return;
        setAiResult(null);
        setComputeMode("loading");
        setActiveStep(1);
    };

    const goBack = () => {
        if (activeStep === 0) return;
        if (activeStep === 1) {
            setActiveStep(0);
            setComputeMode("idle");
            setAiResult(null);
            return;
        }

        if (activeStep === 2) {
            setActiveStep(1);
            setComputeMode("ready");
            return;
        }
    };

    React.useEffect(() => {
        setAiResult(null);
        setComputeMode("idle");
        setSelectedStrategy("balanced");
        setActiveStep(0);
    }, [eventDraft.parkingId]);

    const SidePanel = (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: uiTokens.panelBg,
                border: "1px solid rgba(18,45,61,0.06)",
                height: "100%",
                transition: "opacity 320ms ease, transform 320ms ease, width 320ms ease",
                opacity: isComputing ? 0 : 1,
                transform: isComputing ? "translateX(-24px)" : "translateX(0px)",
                pointerEvents: isComputing ? "none" : "auto",
            }}
        >
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                Reserve parking capacity for your event
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Estimate and secure the right number of parking spots for your guests –
                without knowing who will come by car.
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                "& .MuiStepIcon-text": {
                    fontSize: "0.7rem",
                    fontWeight: 700,
                },
                "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
                    fill: "#fff",
                },
            }}>
                {WIZARD_STEPS.map((s, idx) => (
                    <Step key={s.key}>
                        <StepLabel>
                            <Typography
                                fontWeight={idx === activeStep ? 700 : 600}
                                color={idx === activeStep ? "text.primary" : "text.secondary"}
                            >
                                {s.label}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Paper>
    );

    const StepContent = (
        <Box>
            {activeStep === 0 && (
                <>
                    <EventInfoStep value={eventDraft} onChange={setEventDraft} isMobile={isMobile} />

                    {!isMobile && (
                        <Box sx={{ mt: 8, textAlign: "center" }}>


                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<KeyboardArrowRight />}
                                onClick={startCompute}
                                disabled={!canCompute}
                                sx={{ px: 4, py: 1.2 }}
                            >
                                Calculate optimal guest capacity
                            </Button>
                        </Box>
                    )}
                </>
            )}
            {activeStep === 1 && computeMode === "loading" && (
                <ComputeStep
                    event={eventDraft}
                    onDone={(result) => {
                        setAiResult(result);
                        setSelectedStrategy("balanced");
                        setComputeMode("ready");
                    }}
                />
            )}
            {activeStep === 1 && computeMode === "ready" && aiResult && (
                <StrategyStep
                    ai={aiResult}
                    selected={selectedStrategy}
                    onSelect={setSelectedStrategy}
                    onBack={goBack}
                    onConfirm={() => setActiveStep(2)}
                />
            )}
            {activeStep === 2 && aiResult && (
                <SummaryStep
                    event={eventDraft}
                    ai={aiResult}
                    strategy={selectedStrategy}
                    onBackHome={() => router.push("/")}
                    onCreateAnother={() => {
                        setEventDraft(DEFAULT_EVENT);
                        setAiResult(null);
                        setSelectedStrategy("balanced");
                        setComputeMode("idle");
                        setActiveStep(0);
                    }}
                />
            )}
        </Box>
    );
    const MobileBottomBar =
        isMobile && activeStep === 0 ? (
            <Box
                sx={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderTop: "1px solid rgba(18,45,61,0.08)",
                    bgcolor: "#fff",
                    px: 2,
                    py: 1.5,
                    zIndex: 1300,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Step {activeStep + 1} / {WIZARD_STEPS.length}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                        {WIZARD_STEPS[activeStep].label}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<KeyboardArrowRight />}
                    onClick={startCompute}
                    disabled={!canCompute}
                    sx={{ py: 1.2 }}
                >
                    Calculate optimal guest capacity
                </Button>
            </Box>
        ) : null;

    if (isMobile) {
        return (
            <Box sx={{ pb: activeStep === 0 ? 10 : 2 }}>
                {StepContent}
                {MobileBottomBar}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isComputing ? "1fr" : "320px 1fr",
                gap: 6,
                transition: "grid-template-columns 320ms ease",
            }}
        >
            {!isComputing && SidePanel}
            <Box sx={{ gridColumn: isComputing ? "1 / -1" : "auto" }}>
                {StepContent}
            </Box>
        </Box>
    );
}
