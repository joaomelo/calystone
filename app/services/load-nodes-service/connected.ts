import type { Nodes } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Directory, TextArtifact } from "@/domain";
import { idle } from "@/utils";

import type { LoadNodesService } from "./load";

import { Queue } from "./queue";

export class ConnectedLoadNodesService implements LoadNodesService{
  private clearId?: number;
  private exchangeArtifact: ExchangeArtifactService;
  private nodes: Nodes;
  private openDirectory: OpenDirectoryService;
  private queue: Queue;

  constructor(options: { exchangeArtifact: ExchangeArtifactService; nodes: Nodes, openDirectory: OpenDirectoryService }) {
    const { exchangeArtifact, nodes, openDirectory } = options;
    this.nodes = nodes;
    this.exchangeArtifact = exchangeArtifact;
    this.openDirectory = openDirectory;

    this.queue = new Queue();
  }

  start(): void {
    void this.tick();
  }

  stop(): void {
    clearTimeout(this.clearId);
    this.queue.clear();
  }

  private feed(): void {
    const tenMegabytes = 10_485_760;
    const textArtifacts = this.nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(tenMegabytes));
    this.queue.add(textArtifacts);

    if (!this.queue.empty()) return;

    const directories = this.nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.queue.add(directories);
  }

  private async load() {
    const node = this.queue.next();
    if (!node) return;

    if (node.isBusy() || node.isLoaded()) return;

    if (node instanceof TextArtifact) {
      await this.exchangeArtifact.fetchInto(node);
    }

    if (node instanceof Directory) {
      await this.openDirectory.open(node);
    }
  }

  private async tick() {
    await idle();
    if (this.queue.empty()) {
      this.feed();
    } else {
      await this.load();
    }
    this.clearId = window.setTimeout(() => void this.tick(), 1500);
  }

}