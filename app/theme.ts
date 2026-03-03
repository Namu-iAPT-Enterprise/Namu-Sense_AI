"use client";
import { createTheme, type Theme } from "@mui/material/styles";

const commonTypography = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 14,
  h6: {
    fontSize: "1.1rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  body2: {
    fontSize: "0.9rem",
  },
  caption: {
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
  },
};

const commonComponents = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        height: 26,
        fontSize: "0.8rem",
        fontWeight: 600,
      },
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a1628",
      paper: "#111d31",
    },
    primary: { main: "#4caf50" },
    secondary: { main: "#00e5ff" },
    error: { main: "#f44336" },
    warning: { main: "#ff9800" },
    text: { primary: "#e0e0e0", secondary: "#8899aa" },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #1a2a40",
          padding: "6px 12px",
          fontSize: "0.85rem",
        },
        head: {
          fontWeight: 700,
          textTransform: "uppercase" as const,
          color: "#8899aa",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    primary: { main: "#2e7d32" },
    secondary: { main: "#0097a7" },
    error: { main: "#d32f2f" },
    warning: { main: "#ed6c02" },
    text: { primary: "#1a1a2e", secondary: "#5a6577" },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e0e0e0",
          padding: "6px 12px",
          fontSize: "0.85rem",
        },
        head: {
          fontWeight: 700,
          textTransform: "uppercase" as const,
          color: "#5a6577",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
        },
      },
    },
  },
});

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: { main: "#90caf9" },
    secondary: { main: "#ce93d8" },
    error: { main: "#f44336" },
    warning: { main: "#ffa726" },
    text: { primary: "#e0e0e0", secondary: "#9e9e9e" },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #333",
          padding: "6px 12px",
          fontSize: "0.85rem",
        },
        head: {
          fontWeight: 700,
          textTransform: "uppercase" as const,
          color: "#9e9e9e",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
        },
      },
    },
  },
});

export type ThemeMode = "dark" | "light" | "default";

export const themes: Record<ThemeMode, Theme> = {
  dark: darkTheme,
  light: lightTheme,
  default: defaultTheme,
};

export default darkTheme;
