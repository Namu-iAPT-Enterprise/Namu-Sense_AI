import type { Inspection } from "./api";

export const seedInspections: Inspection[] = [
  {
    sessionId: "INS-20250721-0045",
    timestamp: "2025-07-21 14:35:12",
    partId: "HMC-BMP-20250721-0045",
    verdict: "PASS",
    fusedResult: "CLEAN (99.4%)",
    camResults: {
      CAM1: {
        status: "OK",
        imageUrl: "/images/cam1.jpg",
        detections: [],
      },
      CAM2: {
        status: "OK",
        imageUrl: "/images/cam2.jpg",
        detections: [],
      },
      CAM3: {
        status: "OK",
        imageUrl: "/images/cam3.jpg",
        detections: [],
      },
    },
    review: false,
  },
  {
    sessionId: "INS-20250721-0044",
    timestamp: "2025-07-21 14:34:48",
    partId: "HMC-BMP-20250721-0044",
    verdict: "REJECT",
    fusedResult: "SCRATCH (87.5%)",
    camResults: {
      CAM1: {
        status: "DEFECT",
        imageUrl: "/images/cam1.jpg",
        detections: [
          { type: "SCRATCH", confidence: 0.875, bbox: { x: 180, y: 140, w: 80, h: 30 } },
        ],
      },
      CAM2: {
        status: "OK",
        imageUrl: "/images/cam2.jpg",
        detections: [],
      },
      CAM3: {
        status: "OK",
        imageUrl: "/images/cam3.jpg",
        detections: [],
      },
    },
    review: true,
  },
  {
    sessionId: "INS-20250721-0043",
    timestamp: "2025-07-21 14:34:15",
    partId: "HMC-BMP-20250721-0043",
    verdict: "REJECT",
    fusedResult: "BUBBLE (72.3%)",
    camResults: {
      CAM1: {
        status: "OK",
        imageUrl: "/images/cam1.jpg",
        detections: [],
      },
      CAM2: {
        status: "DEFECT",
        imageUrl: "/images/cam2.jpg",
        detections: [
          { type: "BUBBLE", confidence: 0.723, bbox: { x: 300, y: 200, w: 45, h: 40 } },
        ],
      },
      CAM3: {
        status: "OK",
        imageUrl: "/images/cam3.jpg",
        detections: [],
      },
    },
    review: true,
  },
  {
    sessionId: "INS-20250721-0042",
    timestamp: "2025-07-21 14:33:51",
    partId: "HMC-BMP-20250721-0042",
    verdict: "PASS",
    fusedResult: "CLEAN (98.8%)",
    camResults: {
      CAM1: {
        status: "OK",
        imageUrl: "/images/cam1.jpg",
        detections: [],
      },
      CAM2: {
        status: "OK",
        imageUrl: "/images/cam2.jpg",
        detections: [],
      },
      CAM3: {
        status: "OK",
        imageUrl: "/images/cam3.jpg",
        detections: [],
      },
    },
    review: false,
  },
  {
    sessionId: "INS-20250721-0041",
    timestamp: "2025-07-21 14:33:22",
    partId: "HMC-BMP-20250721-0041",
    verdict: "REJECT",
    fusedResult: "UNEVEN PAINT (65.1%)",
    camResults: {
      CAM1: {
        status: "DEFECT",
        imageUrl: "/images/cam1.jpg",
        detections: [
          { type: "UNEVEN PAINT", confidence: 0.651, bbox: { x: 100, y: 80, w: 120, h: 90 } },
          { type: "SCRATCH", confidence: 0.432, bbox: { x: 400, y: 300, w: 55, h: 20 } },
        ],
      },
      CAM2: {
        status: "DEFECT",
        imageUrl: "/images/cam2.jpg",
        detections: [
          { type: "UNEVEN PAINT", confidence: 0.581, bbox: { x: 220, y: 160, w: 100, h: 70 } },
        ],
      },
      CAM3: {
        status: "OK",
        imageUrl: "/images/cam3.jpg",
        detections: [],
      },
    },
    review: true,
  },
];
