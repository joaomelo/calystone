import type { Directory } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";

import { Status } from "@/utils";

export class EnsureDescriptorService {
  private readonly exchangeArtifact: ExchangeArtifactService;

  constructor(exchangeArtifact: ExchangeArtifactService) {
    this.exchangeArtifact = exchangeArtifact;
  }

  async ensure(directory: Directory): Promise<void> {
    if (!directory.isLoaded()) return;

    const descriptor = directory.descriptor();
    if (!descriptor) return;
    if (descriptor.isLoaded()) return;

    await this.exchangeArtifact.fetchInto(descriptor);
  }

  missing(directory: Directory): Status {
    if (!directory.isLoaded()) return Status.fail("UNABLE_TO_CHECK_DIRECTORY_NOT_LOADED");

    const descriptor = directory.descriptor();
    if (descriptor) return Status.fail("DESCRIPTOR_FOUND");

    return Status.ok();
  }
}