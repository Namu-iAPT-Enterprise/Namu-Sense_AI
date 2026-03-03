"use client";

import { useState, useEffect, useRef } from "react";
import { API_BASE } from "../lib/api";
import type { LogEntry } from "../lib/api";

const MAX_LOGS = 50;

function parseLevel(message: string): LogEntry["level"] {
  if (message.startsWith("[ALERT]")) return "warning";
  if (message.startsWith("[CAM")) return "debug";
  if (message.startsWith("[SYSTEM]")) return "info";
  return "info";
}

export function useLiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const retryTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let es: EventSource | null = null;

    function connect() {
      es = new EventSource(`${API_BASE}/stream/logs`);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const entry: LogEntry = {
            time: data.time ?? new Date().toISOString().slice(11, 23),
            message: data.message ?? event.data,
            level: data.level ?? parseLevel(data.message ?? ""),
          };
          setLogs((prev) => [entry, ...prev].slice(0, MAX_LOGS));
        } catch {
          // plain text fallback
          const entry: LogEntry = {
            time: new Date().toISOString().slice(11, 23),
            message: event.data,
            level: parseLevel(event.data),
          };
          setLogs((prev) => [entry, ...prev].slice(0, MAX_LOGS));
        }
      };

      es.onerror = () => {
        es?.close();
        retryTimeout.current = setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      es?.close();
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, []);

  return logs;
}
