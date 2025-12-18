import type { ParkingRef } from "./types";
import parkings from "./mock/parkings.json";

export const PARKINGS = parkings as ParkingRef[];

export function getParkingById(id: string) {
  return PARKINGS.find((p) => p.id === id) ?? PARKINGS[0];
}
