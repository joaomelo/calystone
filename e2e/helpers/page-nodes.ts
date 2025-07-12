import { frameDashboard } from "./frame-dashboard";

export const pageNodes = {
  url: () => "/nodes",
  ...frameDashboard
} as const;