import { frameDashboard } from "./frame-dashboard";
export const pageOutline = {
  url: () => "/outline",
  ...frameDashboard
} as const;