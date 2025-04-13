import type { Directory } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";

import type { EnsureDescriptorService } from "./ensure";

export class ConnectedEnsureDescriptorService implements EnsureDescriptorService {
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
}