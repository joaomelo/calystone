import { frameDashboard } from "./frame-dashboard";

export const pageFolders = {
  url: () => "/folders",
  ...frameDashboard
} as const;