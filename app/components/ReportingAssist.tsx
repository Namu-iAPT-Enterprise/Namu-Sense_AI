"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useSummary } from "../hooks/useStats";

export default function ReportingAssist() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const borderColor = isLight ? "#d0d5dd" : "#1a2a40";
  const statBg = isLight ? "#f5f7fa" : "#0a1628";

  const { data: summary, isValidating } = useSummary();

  const stats = [
    {
      label: "Total Inspected",
      value: summary ? summary.totalInspected.toLocaleString() : "--",
      color: theme.palette.secondary.main,
    },
    {
      label: "Pass Rate",
      value: summary ? `${summary.passRate}%` : "--%",
      color: theme.palette.primary.main,
    },
    {
      label: "Defects Found",
      value: summary ? summary.defectsFound.toLocaleString() : "--",
      color: theme.palette.error.main,
    },
    {
      label: "Avg Latency",
      value: summary ? `${summary.avgLatency}ms` : "--ms",
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: isValidating && !summary ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <AssessmentIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          REPORTING & ASSIST
        </Typography>
      </Box>

      {/* Filter row */}
      <Box sx={{ display: "flex", gap: 1, mb: 1.5, alignItems: "center" }}>
        <FormControl size="small" sx={{ minWidth: 70 }}>
          <Select
            defaultValue="all"
            sx={{
              bgcolor: statBg,
              color: "text.primary",
              fontSize: "0.85rem",
              height: 28,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor,
              },
            }}
          >
            <MenuItem value="all" sx={{ fontSize: "0.85rem" }}>
              All
            </MenuItem>
            <MenuItem value="pass" sx={{ fontSize: "0.85rem" }}>
              Pass
            </MenuItem>
            <MenuItem value="reject" sx={{ fontSize: "0.85rem" }}>
              Reject
            </MenuItem>
          </Select>
        </FormControl>
        <ButtonGroup size="small" variant="outlined">
          {["\uc624\ub298", "3\uc77c", "7\uc77c", "1\uc6d4"].map((label, i) => (
            <Button
              key={label}
              sx={{
                fontSize: "0.8rem",
                color: i === 0
                  ? (isLight ? "#fff" : "#0a1628")
                  : "text.secondary",
                bgcolor: i === 0 ? "secondary.main" : "transparent",
                borderColor,
                minWidth: 32,
                py: 0.3,
                "&:hover": {
                  bgcolor: i === 0 ? "secondary.main" : (isLight ? "#e8eaed" : "#1a2a40"),
                  borderColor,
                },
              }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Summary stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          mb: 1.5,
        }}
      >
        {stats.map((stat) => (
          <Box
            key={stat.label}
            sx={{
              bgcolor: statBg,
              borderRadius: 1,
              p: 1,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {stat.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: stat.color,
              }}
            >
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Export buttons */}
      <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
        {[
          { label: "CSV", icon: <DownloadIcon sx={{ fontSize: 16 }} /> },
          { label: "Image", icon: <ImageIcon sx={{ fontSize: 16 }} /> },
          { label: "Excel", icon: <TableChartIcon sx={{ fontSize: 16 }} /> },
        ].map((btn) => (
          <Button
            key={btn.label}
            variant="outlined"
            size="small"
            startIcon={btn.icon}
            sx={{
              flex: 1,
              fontSize: "0.8rem",
              color: "text.secondary",
              borderColor,
              textTransform: "none",
              py: 0.5,
              "&:hover": {
                borderColor: "secondary.main",
                color: "secondary.main",
              },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}
