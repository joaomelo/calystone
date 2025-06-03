import type { Nodes } from "@/domain";
import type { AccessAdaptersFactory, FileSystemAdapter, SourceProvider } from "@/infra";

import { createNode } from "@/domain";
import { throwCritical } from "@/utils";

import type { StatusObserver } from "./status";

import { StatusObservable } from "./status";

export class ConnectSourceService {
  private readonly accessAdaptersFactory: AccessAdaptersFactory;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private readonly statusObservable: StatusObservable;

  constructor(options: { accessAdaptersFactory: AccessAdaptersFactory, nodes: Nodes, }) {
    const { accessAdaptersFactory, nodes } = options;
    this.nodes = nodes;
    this.accessAdaptersFactory = accessAdaptersFactory;
    this.statusObservable = new StatusObservable();
  }

  async connect(provider: SourceProvider) {

    const accessAdapter = this.accessAdaptersFactory.create(provider);
    this.fileSystemAdapter = await accessAdapter.request();

    this.reconnect();

    this.statusObservable.next({ fileSystemAdapter: this.fileSystemAdapter, nodes: this.nodes, status: "connected" });
  }

  disconnect() {
    this.statusObservable.next({ status: "disconnected" });

    this.fileSystemAdapter = undefined;
    this.nodes.clear();
  }

  reconnect() {
    if (!this.fileSystemAdapter) throwCritical("NO_FILE_SYSTEM_ADAPTER");

    const rootOptions = this.fileSystemAdapter.resetToRootOnly();
    const rootDirectory = createNode({ nodes: this.nodes, ...rootOptions });

    this.nodes.clear();
    this.nodes.set(rootDirectory);
  }

  subscribe(observer: StatusObserver) {
    return this.statusObservable.subscribe(observer);
  };

}