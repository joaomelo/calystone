import type { AccessAdaptersFactory, AvailabilityFacade, ShareAdapter } from "@/infra";

export interface Options {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;
  shareAdapter: ShareAdapter;
}