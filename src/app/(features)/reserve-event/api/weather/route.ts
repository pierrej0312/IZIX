import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") ?? "Parking Office";
  const date = searchParams.get("date") ?? "2025-06-24";
  const timeSlot = searchParams.get("timeSlot") ?? "afternoon";

  const weatherBySlot: Record<string, any> = {
    morning: { condition: "cloudy", rainProbability: 0.25, tempC: 18 },
    afternoon: { condition: "rain", rainProbability: 0.65, tempC: 16 },
    evening: { condition: "clear", rainProbability: 0.05, tempC: 15 }
  };

  return NextResponse.json({
    location,
    date,
    timeSlot,
    ...weatherBySlot[timeSlot] ?? weatherBySlot.afternoon
  });
}
