import type { Nodes } from "@/domain";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Directory, TextArtifact } from "@/domain";
import { idle, throwCritical } from "@/utils";

import { LoadNodesObservable, type LoadNodesObserver } from "./observable";
import { Queue } from "./queue";

export class LoadNodesService {
  private ARTIFACT_SIZE_THRESHOLD = 10_485_760;
  private clearId?: number;
  private exchangeArtifact?: ExchangeArtifactService;
  private nodes?: Nodes;
  private nodesToLoad: Queue;
  private observable = new LoadNodesObservable();
  private openDirectory?: OpenDirectoryService;
  private SCHEDULE_INTERVAL = 1500;

  constructor() {
    this.nodesToLoad = new Queue();
    this.observable = new LoadNodesObservable();
  }

  pause(): void {
    clearTimeout(this.clearId);

    this.nodesToLoad.clear();
    this.observable.next({ status: "idle" });
  }

  provide(options: { exchangeArtifact: ExchangeArtifactService; nodes: Nodes, openDirectory: OpenDirectoryService }): void {
    const { exchangeArtifact, nodes, openDirectory } = options;
    this.nodes = nodes;
    this.exchangeArtifact = exchangeArtifact;
    this.openDirectory = openDirectory;
  }

  start(): void {
    void this.tick();
    this.observable.next({ status: "loading" });
  }

  stop(): void {
    clearTimeout(this.clearId);

    this.nodes = undefined;
    this.exchangeArtifact = undefined;
    this.openDirectory = undefined;

    this.nodesToLoad.clear();
    this.observable.next({ status: "idle" });
  }

  subscribe(observer: LoadNodesObserver) {
    this.observable.subscribe(observer);
  }

  private feed(): void {
    const { nodes } = this.inject();

    const textArtifacts = nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(this.ARTIFACT_SIZE_THRESHOLD));
    this.nodesToLoad.add(textArtifacts);

    if (!this.nodesToLoad.empty()) return;

    const directories = nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.nodesToLoad.add(directories);
  }

  private inject(): { exchangeArtifact: ExchangeArtifactService; nodes: Nodes; openDirectory: OpenDirectoryService; } {
    if (!this.nodes) throwCritical("NO_NODES");
    if (!this.exchangeArtifact) throwCritical("NO_EXCHANGE_ARTIFACT");
    if (!this.openDirectory) throwCritical("NO_OPEN_DIRECTORY");
    return { exchangeArtifact: this.exchangeArtifact, nodes: this.nodes, openDirectory: this.openDirectory };
  }

  private async load() {
    const { exchangeArtifact, openDirectory } = this.inject();

    const node = this.nodesToLoad.next();
    if (!node) return;

    if (node.isBusy() || node.isLoaded()) return;

    if (node instanceof TextArtifact) {
      await exchangeArtifact.fetchInto(node);
    }

    if (node instanceof Directory) {
      await openDirectory.open(node);
    }
  }

  private async tick() {
    await idle();

    if (this.nodesToLoad.empty()) {
      this.feed();
    } else {
      await this.load();
    }

    this.clearId = window.setTimeout(() => void this.tick(), this.SCHEDULE_INTERVAL);
  }

}