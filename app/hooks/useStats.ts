import useSWR from "swr";
import { API_BASE, fetcher } from "../lib/api";
import type { DefectDistribution, TrendPoint, Summary } from "../lib/api";

export function useDefectDistribution(range = "24h") {
  return useSWR<DefectDistribution[]>(
    `${API_BASE}/stats/defects?range=${range}`,
    fetcher,
  );
}

export function useTrend(range = "7d") {
  return useSWR<TrendPoint[]>(
    `${API_BASE}/stats/trend?range=${range}`,
    fetcher,
  );
}

export function useSummary(range = "24h") {
  return useSWR<Summary>(
    `${API_BASE}/stats/summary?range=${range}`,
    fetcher,
  );
}
