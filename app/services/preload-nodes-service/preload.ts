import type { Nodes } from "@/domain";
import type { SourceOrigin } from "@/infra";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Artifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { idle, Status, throwCritical } from "@/utils";

import { Observable, type Observer } from "./observable";
import { Queue } from "./queue";

export class PreloadNodesService {
  private clearId?: number;
  private exchangeArtifact?: ExchangeArtifactService;
  private nodes: Nodes;
  private readonly nodesToLoad: Queue = new Queue();
  private readonly observable = new Observable();
  private readonly oneMegabyte = 1024 * 1024;
  private openDirectory?: OpenDirectoryService;
  private readonly scheduleInterval = 1500;
  private sourceOrigin?: SourceOrigin;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  available(): Status {
    if (!this.exchangeArtifact) return Status.fail("NO_EXCHANGE_ARTIFACT");
    if (!this.openDirectory) return Status.fail("NO_OPEN_DIRECTORY");
    if (!this.sourceOrigin) return Status.fail("NO_SOURCE_ORIGIN");

    if (this.sourceOrigin !== "local") return Status.fail("NO_SOURCE_ORIGIN");
    return Status.ok();
  }

  pause(): void {
    clearTimeout(this.clearId);

    this.nodesToLoad.clear();
    this.observable.next({ status: "idle" });
  }

  provide(options: {
    exchangeArtifact: ExchangeArtifactService;
    openDirectory: OpenDirectoryService;
    sourceOrigin: SourceOrigin
  }): void {
    const { exchangeArtifact, openDirectory, sourceOrigin } = options;
    this.exchangeArtifact = exchangeArtifact;
    this.openDirectory = openDirectory;
    this.sourceOrigin = sourceOrigin;
  }

  start(): void {
    void this.tick();
    this.observable.next({ status: "loading" });
  }

  stop(): void {
    clearTimeout(this.clearId);

    this.exchangeArtifact = undefined;
    this.openDirectory = undefined;

    this.nodesToLoad.clear();
    this.observable.next({ status: "idle" });
  }

  subscribe(observer: Observer) {
    this.observable.subscribe(observer);
  }

  private feed(): void {
    const { nodes } = this.inject();

    const todoArtifacts = nodes
      .list()
      .filter(node => node instanceof TodoArtifact && !node.isLoaded());
    this.nodesToLoad.add(todoArtifacts);
    if (!this.nodesToLoad.empty()) return;

    const textArtifacts = nodes
      .list()
      .filter(node => node instanceof TextArtifact && !node.isLoaded() && node.sizeBelow(this.oneMegabyte));
    this.nodesToLoad.add(textArtifacts);
    if (!this.nodesToLoad.empty()) return;

    const directories = nodes
      .list()
      .filter(node => node instanceof Directory && !node.isLoaded());
    this.nodesToLoad.add(directories);
  }

  private inject() {
    if (!this.exchangeArtifact) throwCritical("NO_EXCHANGE_ARTIFACT");
    if (!this.openDirectory) throwCritical("NO_OPEN_DIRECTORY");
    if (!this.sourceOrigin) throwCritical("NO_SOURCE_ORIGIN");

    return {
      exchangeArtifact: this.exchangeArtifact,
      nodes: this.nodes,
      openDirectory: this.openDirectory,
      sourceOrigin: this.sourceOrigin,
    };
  }

  private async load() {
    const { exchangeArtifact, openDirectory } = this.inject();

    const node = this.nodesToLoad.next();
    if (!node) return;

    if (node.isBusy() || node.isLoaded()) return;

    if (node instanceof Artifact) {
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

    this.clearId = window.setTimeout(() => void this.tick(), this.scheduleInterval);
  }

}