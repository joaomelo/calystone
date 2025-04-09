import type { TextArtifact } from "@/domain";

import type { ExchangeArtifactService } from "../exchange-artifact-service/exchange";
import type { ExchangeTextService } from "./exchange";

export class ConnectedExchangeTextService implements ExchangeTextService {
  private readonly exchangeArtifact: ExchangeArtifactService;

  constructor(exchangeArtifact: ExchangeArtifactService) {
    this.exchangeArtifact = exchangeArtifact;
  }

  async fetchInto(artifact: TextArtifact): Promise<string> {
    if (!artifact.isLoaded()) {
      await this.exchangeArtifact.fetchInto(artifact);
    }
    return artifact.content;
  }

  async postFrom(options: { artifact: TextArtifact; text: string }): Promise<void> {
    const { artifact, text } = options;
    artifact.content = text;
    await this.exchangeArtifact.postFrom(artifact);
  }
}