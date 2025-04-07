import type { TextArtifact } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import type { ExchangeArtifactService } from "../exchange-artifact-service/exchange";
import type { ExchangeTextService } from "./exchange";

export class ConnectedExchangeTextService implements ExchangeTextService {
  private readonly exchangeService: ExchangeArtifactService;
  private readonly fileSystemAdapter: FileSystemAdapter;

  constructor(options: { exchangeService: ExchangeArtifactService, fileSystemAdapter: FileSystemAdapter }) {
    const { exchangeService, fileSystemAdapter } = options;
    this.exchangeService = exchangeService;
    this.fileSystemAdapter = fileSystemAdapter;
  }

  async fetch(artifact: TextArtifact): Promise<string> {
    if (!artifact.isLoaded()) {
      await this.exchangeService.fetchInto(artifact);
    }
    return artifact.content;
  }

  async post(options: { artifact: TextArtifact; text: string }): Promise<void> {
    const { artifact, text } = options;
    artifact.content = text;
    await this.fileSystemAdapter.postContent({ content: artifact.toBinary(), id: artifact.id });
  }
}