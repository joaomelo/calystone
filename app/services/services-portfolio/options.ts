import type { AccessAdaptersFactory, AvailabilityFacade, FilesSystemAdaptersFactory, ShareAdapter } from "@/infra";

export interface Options {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;
  filesSystemAdaptersFactory: FilesSystemAdaptersFactory;
  shareAdapter: ShareAdapter;
}