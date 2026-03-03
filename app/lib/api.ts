export const API_BASE = "http://localhost:8080/api/v1";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// --- Types ---

export interface CamResult {
  status: "OK" | "DEFECT";
  imageUrl?: string;
  detections?: Detection[];
}

export interface Detection {
  type: string;
  confidence: number;
  bbox: { x: number; y: number; w: number; h: number };
}

export interface Inspection {
  sessionId: string;
  timestamp: string;
  partId: string;
  verdict: "PASS" | "REJECT";
  fusedResult: string;
  camResults: {
    CAM1: CamResult;
    CAM2: CamResult;
    CAM3: CamResult;
  };
  review: boolean;
}

export interface InspectionDetail {
  sessionId: string;
  timestamp: string;
  partId: string;
  verdict: "PASS" | "REJECT";
  fusedResult: string;
  camResults: {
    CAM1: CamResult;
    CAM2: CamResult;
    CAM3: CamResult;
  };
}

export interface DefectDistribution {
  label: string;
  count: number;
  color: string;
}

export interface TrendPoint {
  day: string;
  count: number;
}

export interface Summary {
  totalInspected: number;
  passRate: number;
  defectsFound: number;
  avgLatency: number;
}

export interface SystemStatus {
  project: string;
  line: string;
  status: string;
  plc: string;
  latency: number;
}

export interface LogEntry {
  time: string;
  message: string;
  level: "info" | "debug" | "warning" | "error";
}
