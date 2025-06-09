import type { Nodes } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Artifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { idle } from "@/utils";

import { Observable, type Observer } from "./observable";
import { Queue } from "./queue";

export class PreloadNodesService {
  private clearId?: number;
  private readonly connectSource: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly nodes: Nodes;
  private readonly nodesToLoad: Queue = new Queue();
  private readonly observable = new Observable();
  private readonly oneMegabyte = 1024 * 1024;
  private readonly openDirectory: OpenDirectoryService;
  private readonly scheduleInterval = 750;

  constructor(options: {
    connectSource: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    nodes: Nodes,
    openDirectory: OpenDirectoryService,
  }) {
    this.exchangeArtifact = options.exchangeArtifact;
    this.nodes = options.nodes;
    this.openDirectory = options.openDirectory;
    this.connectSource = options.connectSource;

    this.connectSource.subscribe((options) => {
      this.stop();

      if (options.status === "disconnected") return;

      const { source } = options;
      if (source.origin === "local") {
        this.start();
      }
    });
  }

  start(): void {
    if (this.observable.value() === "loading") return;

    void this.tick();
    this.observable.next({ status: "loading" });
  }

  stop(): void {
    clearTimeout(this.clearId);

    this.nodesToLoad.clear();
    this.observable.next({ status: "idle" });
  }

  subscribe(observer: Observer) {
    this.observable.subscribe(observer);
  }

  private feed(): void {
    const todoArtifacts = this.nodes
      .list()
      .filter(node => node instanceof TodoArtifact && !node.isLoaded());
    this.nodesToLoad.add(todoArtifacts);
    if (!this.nodesToLoad.empty()) return;

    const textArtifacts = this.nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(this.oneMegabyte));
    this.nodesToLoad.add(textArtifacts);
    if (!this.nodesToLoad.empty()) return;

    const directories = this.nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.nodesToLoad.add(directories);
  }

  private async load() {
    const node = this.nodesToLoad.next();
    if (!node) return;
    if (!this.nodes.has(node)) return;
    if (node.isBusy() || node.isLoaded()) return;

    if (node instanceof Artifact) {
      await this.exchangeArtifact.fetchInto(node);
    }

    if (node instanceof Directory) {
      await this.openDirectory.open(node);
    }
  }

  private async tick() {
    await idle();

    if (this.nodesToLoad.empty()) {
      this.feed();
    } else {
      await this.load();
    }

    this.clearId = window.setTimeout(() => void this.tick(), this.scheduleInterval);
  }

}