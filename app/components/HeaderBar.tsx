"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import { useThemeMode } from "../providers";
import type { ThemeMode } from "../theme";
import { useSystemStatus } from "../hooks/useSystemStatus";

const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { mode: "dark", label: "Dark", icon: <DarkModeIcon fontSize="small" /> },
  { mode: "light", label: "Light", icon: <LightModeIcon fontSize="small" /> },
  { mode: "default", label: "Default", icon: <ContrastIcon fontSize="small" /> },
];

export default function HeaderBar() {
  const { themeMode, setThemeMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: status } = useSystemStatus();

  const statusChips = status
    ? [
        { label: `PROJECT: ${status.project}`, color: "#00e5ff" },
        { label: `LINE: ${status.line}`, color: "#00e5ff" },
        { label: `STATUS: ${status.status}`, color: status.status === "RUNNING" ? "#4caf50" : "#ff9800" },
        { label: `PLC: ${status.plc}`, color: status.plc === "CONNECTED" ? "#4caf50" : "#f44336" },
        { label: `LATENCY: ${status.latency}ms`, color: status.latency < 100 ? "#4caf50" : "#ff9800" },
      ]
    : [];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        bgcolor: (t) => t.palette.mode === "light" ? "#e3e7ed" : "#0d1b2a",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#fff",
          }}
        >
          NS
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          NAMUSENSE AI
          <Typography
            component="span"
            sx={{
              color: "text.secondary",
              fontSize: "0.85rem",
              ml: 1,
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            | DEFECT DEEP DIVE & LOG VIEWER
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {statusChips.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            size="small"
            sx={{
              bgcolor: `${chip.color}18`,
              color: chip.color,
              border: `1px solid ${chip.color}40`,
              fontSize: "0.78rem",
              height: 28,
            }}
          />
        ))}
        <IconButton size="small" sx={{ color: "text.secondary", ml: 1 }}>
          <NotificationsIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "text.secondary" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <PaletteIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: { minWidth: 160 },
            },
          }}
        >
          {themeOptions.map((opt) => (
            <MenuItem
              key={opt.mode}
              selected={themeMode === opt.mode}
              onClick={() => {
                setThemeMode(opt.mode);
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>{opt.icon}</ListItemIcon>
              <ListItemText>{opt.label}</ListItemText>
              {themeMode === opt.mode && (
                <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
              )}
            </MenuItem>
          ))}
        </Menu>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <AccountCircleIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
