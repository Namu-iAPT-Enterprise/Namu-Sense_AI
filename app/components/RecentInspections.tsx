"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useInspections } from "../hooks/useInspections";
import type { CamResult } from "../lib/api";

function CamThumbnail({ cam }: { cam: CamResult }) {
  const theme = useTheme();
  const isDefect = cam.status === "DEFECT";
  const borderColor = isDefect ? theme.palette.error.main : theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: 52,
        height: 32,
        borderRadius: 0.5,
        overflow: "hidden",
        border: `2px solid ${borderColor}`,
      }}
    >
      {cam.imageUrl ? (
        <Box
          component="img"
          src={cam.imageUrl}
          alt={cam.status}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: isDefect ? theme.palette.error.main + "15" : theme.palette.primary.main + "15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            color: borderColor,
            fontWeight: 600,
          }}
        >
          {cam.status}
        </Box>
      )}
    </Box>
  );
}

interface Props {
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export default function RecentInspections({ selectedSessionId, onSelectSession }: Props) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { data: inspections, isValidating } = useInspections();

  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: isValidating && !inspections ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <ListAltIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary", fontSize: "1.0rem" }}>
          RECENT INSPECTIONS
        </Typography>
      </Box>
      <TableContainer sx={{ flex: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>TIMESTAMP</TableCell>
              <TableCell>PART ID</TableCell>
              <TableCell>VERDICT</TableCell>
              <TableCell>FUSED RESULT</TableCell>
              <TableCell align="center">CAM1</TableCell>
              <TableCell align="center">CAM2</TableCell>
              <TableCell align="center">CAM3</TableCell>
              <TableCell align="center">REVIEW</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(inspections ?? []).map((row) => {
              const isSelected = row.sessionId === selectedSessionId;
              return (
                <TableRow
                  key={row.sessionId}
                  onClick={() => onSelectSession(row.sessionId)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: isLight ? "action.hover" : "#1a2a4020" },
                    bgcolor: isSelected ? (isLight ? "action.selected" : "#1a2a4030") : "transparent",
                  }}
                >
                  <TableCell sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                    {row.timestamp}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: "monospace" }}>
                    {row.partId}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.verdict}
                      size="small"
                      sx={{
                        bgcolor: row.verdict === "PASS"
                          ? theme.palette.primary.main + "20"
                          : theme.palette.error.main + "20",
                        color: row.verdict === "PASS"
                          ? theme.palette.primary.main
                          : theme.palette.error.main,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", fontSize: "0.85rem" }}>
                    {row.fusedResult}
                  </TableCell>
                  <TableCell align="center">
                    <CamThumbnail cam={row.camResults.CAM1} />
                  </TableCell>
                  <TableCell align="center">
                    <CamThumbnail cam={row.camResults.CAM2} />
                  </TableCell>
                  <TableCell align="center">
                    <CamThumbnail cam={row.camResults.CAM3} />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      size="small"
                      checked={row.review}
                      sx={{
                        color: "text.secondary",
                        "&.Mui-checked": { color: "secondary.main" },
                        p: 0,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
