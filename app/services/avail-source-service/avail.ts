import type {
  AvailabilityFacade,
  SourceProvider
} from "@/infra";

export class AvailSourceService {
  availabilityFacade: AvailabilityFacade;

  constructor(availabilityFacade: AvailabilityFacade) {
    this.availabilityFacade = availabilityFacade;
  }

  avail(provider: SourceProvider) {
    return this.availabilityFacade.available(provider);
  }

}