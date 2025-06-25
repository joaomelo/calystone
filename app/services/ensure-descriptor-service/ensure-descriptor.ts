import type { Directory, Nodes } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";

import { Descriptor } from "@/domain";
import { Status } from "@/utils";

export class EnsureDescriptorService {
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly nodes: Nodes;

  constructor(options: { exchangeArtifact: ExchangeArtifactService, nodes: Nodes }) {
    const { exchangeArtifact, nodes } = options;
    this.exchangeArtifact = exchangeArtifact;
    this.nodes = nodes;
  }

  async ensure(directory: Directory): Promise<void> {
    if (!directory.isLoaded()) return;

    const descriptor = new Descriptor({ directory, nodes: this.nodes });
    const descriptorArtifact = descriptor.artifact();
    if (!descriptorArtifact) return;
    if (descriptorArtifact.isLoaded()) return;

    await this.exchangeArtifact.fetchInto(descriptorArtifact);
  }

  missing(directory: Directory): Status {
    if (!directory.isLoaded()) return Status.fail("UNABLE_TO_CHECK_DIRECTORY_NOT_LOADED");

    const descriptor = new Descriptor({ directory, nodes: this.nodes });
    const descriptorArtifact = descriptor.artifact();
    if (descriptorArtifact) return Status.fail("DESCRIPTOR_FOUND");

    return Status.ok();
  }
}