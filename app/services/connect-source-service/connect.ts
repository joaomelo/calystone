import type { Nodes } from "@/domain";
import type { FileSystemAdapter, Source, SourcesAdaptersPortfolio } from "@/infra";

import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

import type { StatusObserver } from "./status";

import { StatusObservable } from "./status";

interface Options {
  nodes: Nodes,
  sourcesAdaptersPortfolio: SourcesAdaptersPortfolio
}

export class ConnectionService {
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly sourcesAdaptersPortfolio: SourcesAdaptersPortfolio;
  private readonly statusObservable: StatusObservable;

  constructor({ nodes, sourcesAdaptersPortfolio }: Options) {
    this.sourcesAdaptersPortfolio = sourcesAdaptersPortfolio;
    this.nodes = nodes;
    this.statusObservable = new StatusObservable();
    this.accessAdaptersFactory = options.accessAdaptersFactory;
  }

  async connect(source: Source) {
    const sourceAdapter = this.sourcesAdaptersPortfolio.get(source);
    this.fileSystemAdapter = await sourceAdapter.createFileSystemAdapter();
    this.reset(this.fileSystemAdapter);
    this.statusObservable.next({ source, status: "connected" });
  }

  disconnect() {
    this.statusObservable.next({ status: "disconnected" });
    this.reset();
  }

  reconnect() {
    const fileSystemAdapter = this.fileSystemAdapter;
    if (!fileSystemAdapter) throwCritical("NO_FILE_SYSTEM_ADAPTER", "the connection must have a file system adapter to reconect");

    this.reset(fileSystemAdapter);
  }

  async request(source: Source) {
    const accessAdapter = this.accessAdaptersFactory.create(source);
    return accessAdapter.request();
  }

  subscribe(observer: StatusObserver) {
    return this.statusObservable.subscribe(observer);
  };

  private reset(fileSystemAdapter?: FileSystemAdapter) {
    this.nodes.clear();

    this.fileSystemAdapter?.reset();
    this.fileSystemAdapter = fileSystemAdapter;

    if (!this.fileSystemAdapter) return;

    const { resolveRoot: rootData } = this.fileSystemAdapter;
    const rootDirectory = new Directory({ nodes: this.nodes, ...rootData });
    this.nodes.set(rootDirectory);
  }

}