export type ParkingRef = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  capacity: {
    total: number;
    guestZone: number;
    employeeZone: number;
  };
};

export type EventType =
  | "conference"
  | "board_meeting"
  | "training"
  | "client_meeting"
  | "vip";

export type TimeSlot = "morning" | "afternoon" | "evening";

export type EventDraft = {
  eventName: string;
  eventType: EventType | "";
  date: string;
  timeSlot: TimeSlot | "";
  guests: number;
  location?: string;
  parkingId: string; 
};

export const DEFAULT_EVENT: EventDraft = {
  eventName: "",
  eventType: "",
  date: "",
  timeSlot: "",
  guests: 20,
  parkingId: "p_office_01",
};


export const WIZARD_STEPS = [
  { key: "event", label: "Event Information" },
  { key: "strategy", label: "Reservation strategy" },
  { key: "summary", label: "Summary" },
] as const;

export type WizardStepIndex = 0 | 1 | 2;

export type GuestZoneInfo = {
  name: string;
  level: string;
  zone: string;
  capacity: number;
  sufficient: boolean;
};

export type StrategyKey = "safe" | "balanced" | "aggressive";

export type AiResult = {
  insight: string;
  confidence: "low" | "medium" | "high";

  estimatedCars: number;
  recommendedSpots: number;

  predictedPeakOccupancyPct: number;
  risk: "low" | "medium" | "high";

  guestZone: GuestZoneInfo;

  signalsUsed: string[];
};
