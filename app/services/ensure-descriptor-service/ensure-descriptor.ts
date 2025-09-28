import type { Directory } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";

import { Descriptor } from "@/domain";
import { Status } from "@/utils";

import type { ConnectSourceService } from "../connect-source-service/connect";

export class EnsureDescriptorService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;

  constructor(options: {
    connectSourceService: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService
  }) {
    this.connectSourceService = options.connectSourceService;
    this.exchangeArtifact = options.exchangeArtifact;
  }

  private inject() {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return nodes;
  }

  description(directory: Directory): string {
    const nodes = this.inject();
    const descriptor = new Descriptor(nodes);
    return descriptor.description(directory);
  }

  async ensure(directory: Directory): Promise<void> {
    const nodes = this.inject();
    const descriptor = new Descriptor(nodes);

    if (!directory.isLoaded()) return;

    const descriptorArtifact = descriptor.artifact(directory);
    if (!descriptorArtifact) return;
    if (descriptorArtifact.isLoaded()) return;

    await this.exchangeArtifact.fetchInto(descriptorArtifact);
  }

  has(directory: Directory): Status {
    const nodes = this.inject();
    const descriptor = new Descriptor(nodes);

    if (!directory.isLoaded()) return Status.fail("UNABLE_TO_CHECK_DIRECTORY_NOT_LOADED");

    const descriptorArtifact = descriptor.artifact(directory);
    if (!descriptorArtifact) return Status.fail("DESCRIPTOR_NOT_FOUND");

    return Status.ok();
  }
}