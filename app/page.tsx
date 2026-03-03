"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import HeaderBar from "./components/HeaderBar";
import RecentInspections from "./components/RecentInspections";
import SelectedPartAnalysis from "./components/SelectedPartAnalysis";
import DefectClassification from "./components/DefectClassification";
import DailyInspectionTrend from "./components/DailyInspectionTrend";
import ReportingAssist from "./components/ReportingAssist";
import LiveLogs from "./components/LiveLogs";

export default function Home() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderBar />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5, p: 1.5 }}>
        {/* Top row: Recent Inspections + Selected Part Analysis */}
        <Box sx={{ display: "flex", gap: 1.5, flex: 1, minHeight: 280 }}>
          <Box sx={{ flex: 55 }}>
            <RecentInspections
              selectedSessionId={selectedSessionId}
              onSelectSession={setSelectedSessionId}
            />
          </Box>
          <Box sx={{ flex: 45 }}>
            <SelectedPartAnalysis sessionId={selectedSessionId} />
          </Box>
        </Box>

        {/* Bottom row: Defect Classification + Daily Trend + Reporting */}
        <Box sx={{ display: "flex", gap: 1.5, minHeight: 220 }}>
          <Box sx={{ flex: 35 }}>
            <DefectClassification />
          </Box>
          <Box sx={{ flex: 35 }}>
            <DailyInspectionTrend />
          </Box>
          <Box sx={{ flex: 30 }}>
            <ReportingAssist />
          </Box>
        </Box>

        {/* Live Logs strip */}
        <LiveLogs />
      </Box>
    </Box>
  );
}
