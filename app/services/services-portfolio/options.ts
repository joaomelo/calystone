import type { AccessAdaptersFactory, AvailabilityFacade, ExportAdapter, ShareAdapter } from "@/infra";

export interface Options {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;
  preloadEnabled: boolean;
  exportAdapter: ExportAdapter;
  shareAdapter: ShareAdapter;
}