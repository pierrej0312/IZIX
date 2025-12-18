import { NextResponse } from "next/server";

const BE_HOLIDAYS_2025 = [
  "2025-01-01",
  "2025-04-21",
  "2025-05-01",
  "2025-05-29",
  "2025-06-09",
  "2025-07-21",
  "2025-08-15",
  "2025-11-01",
  "2025-11-11",
  "2025-12-25"
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const isPublicHoliday = date ? BE_HOLIDAYS_2025.includes(date) : false;

  const isSchoolHoliday = date ? (date >= "2025-07-01" && date <= "2025-08-31") : false;

  return NextResponse.json({
    country: "BE",
    date,
    isPublicHoliday,
    isSchoolHoliday
  });
}
