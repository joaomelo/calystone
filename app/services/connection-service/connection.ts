import type { Nodes } from "@/domain";
import type { FileSystemAdapter, Source, SourceAdapterPortfolio } from "@/infra";

import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

import type { StatusObserver } from "./status";

import { StatusObservable } from "./status";

interface Options {
  nodes: Nodes,
  sourceAdapterPortfolio: SourceAdapterPortfolio
}

export class ConnectionService {
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly sourceAdapterPortfolio: SourceAdapterPortfolio;
  private readonly statusObservable: StatusObservable;

  constructor({ nodes, sourceAdapterPortfolio }: Options) {
    this.sourceAdapterPortfolio = sourceAdapterPortfolio;
    this.nodes = nodes;
    this.statusObservable = new StatusObservable();
  }

  async connect(source: Source) {
    const sourceAdapter = this.sourceAdapterPortfolio.get(source);
    this.fileSystemAdapter = await sourceAdapter.getOrCreateFileSystemAdapter();
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

  subscribe(observer: StatusObserver) {
    return this.statusObservable.subscribe(observer);
  };

  private reset(fileSystemAdapter?: FileSystemAdapter) {
    this.nodes.clear();

    this.fileSystemAdapter?.reset();
    this.fileSystemAdapter = fileSystemAdapter;

    if (!this.fileSystemAdapter) return;

    const { rootData } = this.fileSystemAdapter;
    const rootDirectory = new Directory({ nodes: this.nodes, ...rootData });
    this.nodes.set(rootDirectory);
  }

}