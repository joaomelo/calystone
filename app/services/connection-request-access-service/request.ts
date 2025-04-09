import type { AccessAdaptersFactory, AvailabilityFacade, Source } from "@/infra";

export class RequestAccessService {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;

  constructor(options: { accessAdaptersFactory: AccessAdaptersFactory, availabilityFacade: AvailabilityFacade }) {
    this.accessAdaptersFactory = options.accessAdaptersFactory;
    this.availabilityFacade = options.availabilityFacade;
  }

  available(source: Source) {
    return this.availabilityFacade.available(source);
  }

  async request(source: Source) {
    const accessAdapter = this.accessAdaptersFactory.create(source);
    return accessAdapter.request();
  }

}