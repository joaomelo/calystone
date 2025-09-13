import type { ConnectSourceService } from "@/services/connect-source-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import {
  idle,
  LoggerContainer,
  Tracker
} from "@/utils";
import { BehaviorSubject } from "rxjs";

import { Loader } from "./loader";

export type PreloadState = { status: "idle" } | { status: "loading" };

export class PreloadNodesService {
  private clearId?: number;
  private readonly connectSource: ConnectSourceService;
  private readonly exchangeArtifact: ExchangeArtifactService;
  private readonly loader: Loader;
  private readonly observable: BehaviorSubject<PreloadState>;
  private readonly openDirectory: OpenDirectoryService;
  private readonly scheduleInterval = 50;
  private readonly scheduleIntervalIdle = 1000;
  private readonly tracker = new Tracker("loaded-nodes");

  constructor(options: {
    connectSource: ConnectSourceService,
    exchangeArtifact: ExchangeArtifactService,
    openDirectory: OpenDirectoryService,
    preloadEnabled: boolean,
  }) {
    this.exchangeArtifact = options.exchangeArtifact;
    this.openDirectory = options.openDirectory;
    this.connectSource = options.connectSource;
    this.observable = new BehaviorSubject<PreloadState>({ status: "idle" });

    const oneMegabyte = 1024 * 1024;
    const batchSize = 100;
    this.loader = new Loader({
      batchSize,
      connectSource: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      openDirectory: this.openDirectory,
      textArtifactSizeLimit: oneMegabyte,
    });

    this.connectSource.subscribe(({
      source,
      status
    }) => {
      this.stop();

      if (!options.preloadEnabled) return;
      if (status === "disconnected") return;

      if (source.origin === "local") {
        this.start();
      }
    });
  }

  start(): void {
    if (this.state().status === "loading") return;

    void this.tick();
    this.observable.next({ status: "loading" });
  }

  state() {
    return this.observable.value;
  }

  stop(): void {
    clearTimeout(this.clearId);
    this.loader.reset();
    this.tracker.reset();
    this.observable.next({ status: "idle" });
  }

  subscribe(observer: (state: PreloadState) => void) {
    this.observable.subscribe(observer);
  }

  private async tick() {
    const mark = this.track();

    await idle();
    const loaded = await this.loader.run();

    mark(loaded);

    const interval = loaded === 0 ? this.scheduleIntervalIdle : this.scheduleInterval;
    this.clearId = window.setTimeout(() => void this.tick(), interval);
  }

  private track() {
    const mark = this.tracker.record();

    return (loaded: number) => {
      const ignore = -1;
      const amount = loaded === 0 ? ignore : loaded;
      mark(amount);

      const logger = LoggerContainer.use();
      logger.debug(this.tracker.summary());
    };
  }
}