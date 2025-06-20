import type { Node, Nodes } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Artifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { Exception, LoggerContainer, Queue } from "@/utils";

export class Loader {
  private readonly batchSize: number;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly nodes: Nodes;
  private readonly openDirectory: OpenDirectoryService;
  private readonly queue: Queue<Node>;
  private readonly textArtifactSizeLimit: number;

  constructor(options: {
    batchSize: number,
    exchangeArtifact: ExchangeArtifactService,
    nodes: Nodes,
    openDirectory: OpenDirectoryService,
    textArtifactSizeLimit: number,
  }) {
    this.exchangeArtifact = options.exchangeArtifact;
    this.nodes = options.nodes;
    this.openDirectory = options.openDirectory;
    this.queue = new Queue();
    this.textArtifactSizeLimit = options.textArtifactSizeLimit;
    this.batchSize = options.batchSize;
  }

  reset(): void {
    this.queue.clear();
  }

  async run() {
    if (this.queue.empty()) {
      this.feed();
    }

    await this.load();
  }

  private feed(): void {
    const todoArtifacts = this.nodes
      .list()
      .filter(node => node instanceof TodoArtifact && !node.isLoaded());
    this.queue.add(todoArtifacts);
    if (!this.queue.empty()) return;

    const textArtifacts = this.nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(this.textArtifactSizeLimit));
    this.queue.add(textArtifacts);
    if (!this.queue.empty()) return;

    const directories = this.nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.queue.add(directories);
  }

  private async load() {
    const nodes = this.queue.next(this.batchSize);

    for (const node of nodes) {
      if (!this.nodes.has(node)) continue;
      if (node.isBusy() || node.isLoaded()) continue;

      try {
        if (node instanceof Artifact) {
          await this.exchangeArtifact.fetchInto(node);
        }

        if (node instanceof Directory) {
          await this.openDirectory.open(node);
        }
      } catch (error) {
        const exception = new Exception({ cause: error, message: "UNABLE_TO_PRELOAD_NODE", });
        const logger = LoggerContainer.use();
        logger.error(exception);
      }
    }
  }

}