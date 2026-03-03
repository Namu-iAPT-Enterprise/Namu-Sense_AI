"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useDefectDistribution } from "../hooks/useStats";

export default function DefectClassification() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const trackBg = isLight ? "#e8eaed" : "#0a1628";
  const { data: raw, isValidating } = useDefectDistribution();

  const total = raw?.reduce((sum, d) => sum + d.count, 0) || 1;
  const defects = (raw ?? []).map((d) => ({
    label: d.label,
    value: Math.round((d.count / total) * 100),
    color: d.color || "#90a4ae",
  }));

  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: isValidating && !raw ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <BugReportIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          DEFECT CLASSIFICATION
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.2 }}>
        {defects.map((d) => (
          <Box key={d.label}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {d.label}
              </Typography>
              <Typography
                sx={{ fontSize: "0.85rem", color: d.color, fontWeight: 700 }}
              >
                {d.value}%
              </Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                bgcolor: trackBg,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${d.value}%`,
                  height: "100%",
                  bgcolor: d.color,
                  borderRadius: 4,
                  boxShadow: isLight ? "none" : `0 0 8px ${d.color}40`,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
