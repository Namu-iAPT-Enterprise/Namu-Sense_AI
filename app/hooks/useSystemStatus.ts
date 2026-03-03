import useSWR from "swr";
import { API_BASE, fetcher } from "../lib/api";
import type { SystemStatus } from "../lib/api";

export function useSystemStatus() {
  return useSWR<SystemStatus>(
    `${API_BASE}/system/status`,
    fetcher,
    { refreshInterval: 10_000 },
  );
}
