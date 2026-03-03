import useSWR from "swr";
import { API_BASE, fetcher } from "../lib/api";
import type { Inspection, InspectionDetail } from "../lib/api";
import { seedInspections } from "../lib/seed";

export function useInspections(limit = 20) {
  return useSWR<Inspection[]>(
    `${API_BASE}/inspections?limit=${limit}`,
    fetcher,
    { fallbackData: seedInspections },
  );
}

export function useInspectionDetail(sessionId: string | null) {
  const seed = seedInspections.find((i) => i.sessionId === sessionId);
  return useSWR<InspectionDetail>(
    sessionId ? `${API_BASE}/inspections/${sessionId}` : null,
    fetcher,
    { fallbackData: seed ?? undefined },
  );
}
