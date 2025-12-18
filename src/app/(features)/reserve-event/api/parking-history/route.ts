import { NextResponse } from "next/server";
import history from "../../_lib/mock/parkingHistory.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") ?? "Parking Office";

  // @ts-expect-error json typing
  const data = history[location];

  return NextResponse.json({
    location,
    ...(data ?? null)
  });
}
