"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useInspectionDetail } from "../hooks/useInspections";
import type { CamResult } from "../lib/api";

interface Props {
  sessionId: string | null;
}

function BoundingBoxes({ cam, width, height }: { cam: CamResult; width: number; height: number }) {
  const theme = useTheme();
  if (!cam.detections?.length) return null;

  return (
    <>
      {cam.detections.map((det, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: `${(det.bbox.x / width) * 100}%`,
            top: `${(det.bbox.y / height) * 100}%`,
            width: `${(det.bbox.w / width) * 100}%`,
            height: `${(det.bbox.h / height) * 100}%`,
            border: `2px solid ${theme.palette.error.main}`,
            borderRadius: 0.5,
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: -18,
              left: 0,
              fontSize: "0.65rem",
              bgcolor: theme.palette.error.main,
              color: "#fff",
              px: 0.5,
              borderRadius: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            {det.type} {(det.confidence * 100).toFixed(0)}%
          </Typography>
        </Box>
      ))}
    </>
  );
}

export default function SelectedPartAnalysis({ sessionId }: Props) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const gridColor = isLight ? "#00000010" : "#1a2a4020";
  const gridColorFaint = isLight ? "#00000008" : "#1a2a4015";
  const camBgColor = isLight ? "#f5f7fa" : "#0a1628";
  const borderColor = isLight ? "#e0e0e0" : "#1a2a40";

  const { data: detail, isValidating } = useInspectionDetail(sessionId);

  // "Select a part" placeholder
  if (!sessionId) {
    return (
      <Paper
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 1.5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CameraAltIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.4, mb: 1 }} />
        <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
          Select a part from the inspection table
        </Typography>
      </Paper>
    );
  }

  const cam1 = detail?.camResults?.CAM1;
  const cam2 = detail?.camResults?.CAM2;
  const cam3 = detail?.camResults?.CAM3;
  const hasImage = !!cam1?.imageUrl;

  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: isValidating && !detail ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <CameraAltIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          SELECTED PART ANALYSIS
        </Typography>
        <Chip
          label={detail?.partId ?? sessionId}
          size="small"
          sx={{
            ml: "auto",
            bgcolor: theme.palette.secondary.main + "18",
            color: "secondary.main",
            fontSize: "0.8rem",
          }}
        />
      </Box>

      {/* Main camera view */}
      <Box
        sx={{
          flex: 3,
          bgcolor: camBgColor,
          borderRadius: 1,
          mb: 1,
          position: "relative",
          minHeight: 0,
          border: `1px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {hasImage ? (
          <>
            <Box
              component="img"
              src={cam1!.imageUrl}
              alt="CAM1"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            <BoundingBoxes cam={cam1!} width={640} height={480} />
          </>
        ) : (
          <>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <Box
              sx={{
                width: "60%",
                height: "50%",
                border: `2px dashed ${theme.palette.primary.main}60`,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: "70%",
                  bgcolor: theme.palette.primary.main + "10",
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.primary.main}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textAlign: "center",
                    textShadow: isLight ? "none" : `0 0 10px ${theme.palette.primary.main}50`,
                  }}
                >
                  {detail?.verdict === "REJECT" ? "DEFECT DETECTED" : "NO DEFECT DETECTED"}
                </Typography>
              </Box>
            </Box>
          </>
        )}
        <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 0.5 }}>
          <Chip
            label="Cam1 | Deep-Dive (Scratch & Bubble)"
            size="small"
            sx={{
              bgcolor: theme.palette.secondary.main + "20",
              color: "secondary.main",
              fontSize: "0.95rem",
              height: 24,
            }}
          />
        </Box>
        <Box sx={{ position: "absolute", bottom: 8, right: 8, display: "flex", gap: 0.5 }}>
          <Chip
            label={detail?.fusedResult ?? "CONFIDENCE: --"}
            size="small"
            sx={{
              bgcolor: theme.palette.primary.main + "20",
              color: "primary.main",
              fontSize: "0.95rem",
              height: 24,
            }}
          />
        </Box>
      </Box>

      {/* Secondary camera views */}
      <Box sx={{ display: "flex", gap: 1, flex: 2 }}>
        {[
          { label: "Cam2", cam: cam2, fallbackStatus: "CLEAN", fallbackColor: theme.palette.primary.main },
          { label: "Cam3", cam: cam3, fallbackStatus: "NO DETECT", fallbackColor: theme.palette.warning.main },
        ].map((entry) => {
          const status = entry.cam?.status ?? entry.fallbackStatus;
          const color = entry.cam?.status === "DEFECT" ? theme.palette.error.main : entry.fallbackColor;
          const hasImg = !!entry.cam?.imageUrl;

          return (
            <Box
              key={entry.label}
              sx={{
                flex: 1,
                bgcolor: camBgColor,
                borderRadius: 1,
                p: 1,
                border: `1px solid ${borderColor}`,
                minHeight: 0,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {hasImg ? (
                <Box
                  component="img"
                  src={entry.cam!.imageUrl}
                  alt={entry.label}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      `linear-gradient(${gridColorFaint} 1px, transparent 1px), linear-gradient(90deg, ${gridColorFaint} 1px, transparent 1px)`,
                    backgroundSize: "15px 15px",
                  }}
                />
              )}
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  position: "absolute",
                  top: 4,
                  left: 6,
                }}
              >
                {entry.label}
              </Typography>
              <Chip
                label={status}
                size="small"
                sx={{
                  bgcolor: color + "18",
                  color,
                  fontSize: "0.95rem",
                  height: 24,
                  fontWeight: 600,
                  position: hasImg ? "absolute" : "static",
                  bottom: hasImg ? 8 : undefined,
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
