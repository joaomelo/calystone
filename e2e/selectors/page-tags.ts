import { frameDashboard } from "./frame-dashboard";

export const pageTags = {
  url: () => "/tags",
  ...frameDashboard
} as const;