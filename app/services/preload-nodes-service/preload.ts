import type { Nodes } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { idle } from "@/utils";

import { Loader } from "./loader";
import { Observable, type Observer } from "./observable";
import { PreloadTracker } from "./preload-tracker";

export class PreloadNodesService {
  private clearId?: number;
  private readonly connectSource: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly loader: Loader;
  private readonly nodes: Nodes;
  private readonly observable = new Observable();
  private readonly openDirectory: OpenDirectoryService;
  private readonly preloadTracker: PreloadTracker;
  private readonly scheduleInterval = 50;

  constructor(options: {
    connectSource: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    nodes: Nodes,
    openDirectory: OpenDirectoryService,
    preloadEnabled: boolean,
  }) {
    this.exchangeArtifact = options.exchangeArtifact;
    this.nodes = options.nodes;
    this.openDirectory = options.openDirectory;
    this.connectSource = options.connectSource;
    this.preloadTracker = new PreloadTracker(this.nodes);

    const isOneMegabyte = 1024 * 1024;
    const batchSize = 100;
    this.loader = new Loader({
      batchSize,
      exchangeArtifact: this.exchangeArtifact,
      nodes: this.nodes,
      openDirectory: this.openDirectory,
      textArtifactSizeLimit: isOneMegabyte,
    });

    this.connectSource.subscribe((connectStatusOptions) => {
      this.stop();

      if (!options.preloadEnabled) return;
      if (connectStatusOptions.status === "disconnected") return;

      const { source } = connectStatusOptions;
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
    this.loader.reset();
    this.observable.next({ status: "idle" });
  }

  subscribe(observer: Observer) {
    this.observable.subscribe(observer);
  }

  private async tick() {
    await idle();
    await this.loader.run();
    this.preloadTracker.mark();
    this.clearId = window.setTimeout(() => void this.tick(), this.scheduleInterval);
  }

}