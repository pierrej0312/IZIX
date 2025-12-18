import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  const { event, weather, holidays, parking } = payload;

  const guests = Number(event?.guests ?? 20);

  let carUsage = 0.75;

  if (event?.eventType === "client_meeting") carUsage += 0.10;
  if (event?.eventType === "conference") carUsage += 0.05;
  if (event?.eventType === "training") carUsage -= 0.05;

  if (weather?.condition === "rain") carUsage += 0.08;
  if (holidays?.isSchoolHoliday) carUsage -= 0.05;

  carUsage = Math.max(0.45, Math.min(carUsage, 0.95));

  const estimatedCars = Math.round(guests * carUsage);

  const recommendedSpots = Math.max(1, Math.round(estimatedCars + 2));

  const guestZoneCapacity = Number(parking?.guestZoneCapacity ?? 20);
  const guestZoneSufficient = recommendedSpots <= guestZoneCapacity;

  const baseOcc = parking?.historical?.find((h: any) => h.hour === "09:00")?.avgOccupancyPct ?? 72;
  const occupancyWithEvent = Math.min(99, Math.round(baseOcc + (recommendedSpots / 2)));

  return NextResponse.json({
    insight: `For a ${event?.eventType?.replace("_", " ") ?? "business"} event like this, most guests tend to arrive by car.`,
    confidence: "high",
    recommendedSpots,
    estimatedCars,
    guestZone: {
      name: "Guest Zone",
      level: "-2",
      zone: "B",
      capacity: guestZoneCapacity,
      sufficient: guestZoneSufficient
    },
    predictedPeakOccupancyPct: occupancyWithEvent,
    risk: occupancyWithEvent >= 92 ? "high" : occupancyWithEvent >= 85 ? "medium" : "low",
    signalsUsed: [
      "Event type",
      "Weather forecast",
      "Holiday / school period",
      "Parking occupancy history",
      "Similar events patterns"
    ]
  });
}
