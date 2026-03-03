"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useLiveLogs } from "../hooks/useLiveLogs";

function useLogColor() {
  const theme = useTheme();
  return (level: string) => {
    switch (level) {
      case "info":
        return theme.palette.primary.main;
      case "debug":
        return theme.palette.secondary.main;
      case "warning":
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };
}

export default function LiveLogs() {
  const theme = useTheme();
  const getLogColor = useLogColor();
  const isLight = theme.palette.mode === "light";

  const logs = useLiveLogs();

  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <TerminalIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          LIVE LOGS
        </Typography>
        <Box
          sx={{
            ml: "auto",
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: logs.length > 0 ? "primary.main" : "text.disabled",
            boxShadow: logs.length > 0
              ? (t) => `0 0 6px ${t.palette.primary.main}`
              : "none",
            animation: logs.length > 0 ? "pulse 2s infinite" : "none",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.4 },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "0.85rem",
          display: "flex",
          flexDirection: "column",
          gap: 0.3,
        }}
      >
        {logs.map((log, i) => {
          const isFirst = i === 0 && logs.length > 0;
          return (
            <Box
              key={`${log.time}-${i}`}
              sx={{
                display: "flex",
                gap: 1,
                py: 0.4,
                px: 1,
                borderLeft: `3px solid ${isFirst ? theme.palette.secondary.main : getLogColor(log.level)}`,
                bgcolor: isFirst
                  ? theme.palette.secondary.main + (isLight ? "12" : "08")
                  : "transparent",
                borderRadius: "0 4px 4px 0",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: "0.82rem",
                  color: "text.secondary",
                  fontFamily: "'Roboto Mono', monospace",
                  flexShrink: 0,
                }}
              >
                {log.time}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.82rem",
                  color: getLogColor(log.level),
                  fontFamily: "'Roboto Mono', monospace",
                }}
              >
                {log.message}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
