import { frameDashboard } from "../selectors/frame-dashboard";

export const pageNodes = {
  url: () => "/nodes",
  ...frameDashboard
} as const;