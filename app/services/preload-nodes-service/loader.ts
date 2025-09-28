import type { Node } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import {
  Artifact,
  Directory,
  TextArtifact,
  TodoArtifact
} from "@/domain";
import {
  Exception,
  LoggerContainer,
  Queue
} from "@/utils";

export class Loader {
  private readonly batchSize: number;
  private readonly connectSource: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly openDirectory: OpenDirectoryService;
  private readonly queue: Queue<Node>;
  private readonly textArtifactSizeLimit: number;

  constructor({
    batchSize,
    connectSource,
    exchangeArtifact,
    openDirectory,
    textArtifactSizeLimit,
  }: {
    batchSize: number,
    connectSource: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    openDirectory: OpenDirectoryService,
    textArtifactSizeLimit: number,
  }) {
    this.queue = new Queue();

    this.exchangeArtifact = exchangeArtifact;
    this.connectSource = connectSource;
    this.openDirectory = openDirectory;
    this.textArtifactSizeLimit = textArtifactSizeLimit;
    this.batchSize = batchSize;
  }

  private inject() {
    const { nodes } = this.connectSource.stateConnectedOrThrow();
    return nodes;
  }

  reset(): void {
    this.queue.clear();
  }

  async run() {
    if (this.queue.empty()) {
      this.feed();
    }

    const loaded = await this.load();
    return loaded;
  }

  private feed(): void {
    const nodes = this.inject();

    const todoArtifacts = nodes
      .list()
      .filter(node => node instanceof TodoArtifact && !node.isLoaded());
    this.queue.add(todoArtifacts);
    if (!this.queue.empty()) return;

    const textArtifacts = nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(this.textArtifactSizeLimit));
    this.queue.add(textArtifacts);
    if (!this.queue.empty()) return;

    const directories = nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.queue.add(directories);
  }

  private async load() {
    const nodes = this.inject();

    const batchOfNodes = this.queue.next(this.batchSize);
    for (const node of batchOfNodes) {
      if (!nodes.has(node)) continue;
      if (node.isBusy() || node.isLoaded()) continue;

      try {
        if (node instanceof Artifact) {
          await this.exchangeArtifact.fetchInto(node);
        }

        if (node instanceof Directory) {
          await this.openDirectory.open(node);
        }
      } catch (error) {
        const exception = new Exception({
          cause: error,
          message: "UNABLE_TO_PRELOAD_NODE",
        });
        const logger = LoggerContainer.use();
        logger.error(exception);
      }
    }

    return batchOfNodes.length;
  }

}