import type { AvailabilityFacade, Source } from "@/infra";

export class AvailSourceService {
  availabilityFacade: AvailabilityFacade;

  constructor(availabilityFacade: AvailabilityFacade) {
    this.availabilityFacade = availabilityFacade;
  }

  avail(source: Source) {
    return this.availabilityFacade.available(source);
  }

}