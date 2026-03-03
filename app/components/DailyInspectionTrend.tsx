"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useTrend } from "../hooks/useStats";

export default function DailyInspectionTrend() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const gridStroke = isLight ? "#e0e0e0" : "#1a2a40";
  const tickFill = theme.palette.text.secondary;
  const primaryColor = theme.palette.primary.main;

  const { data: raw, isValidating } = useTrend();
  const data = (raw ?? []).map((p) => ({ day: p.day, inspections: p.count }));

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <TrendingUpIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          DAILY INSPECTION TREND
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis
              dataKey="day"
              tick={{ fill: tickFill, fontSize: 13 }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: tickFill, fontSize: 13 }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                border: `1px solid ${gridStroke}`,
                borderRadius: 4,
                fontSize: 14,
                color: theme.palette.text.primary,
              }}
            />
            <Area
              type="monotone"
              dataKey="inspections"
              stroke={primaryColor}
              strokeWidth={2}
              fill="url(#greenGradient)"
              dot={{ fill: primaryColor, r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: primaryColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
