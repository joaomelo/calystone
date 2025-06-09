import type { Nodes } from "@/domain";
import type { AccessAdaptersFactory, FileSystemAdapter, Source, SourceProvider } from "@/infra";

import { createNode } from "@/domain";
import { sources } from "@/infra";
import { throwError } from "@/utils";

import type { StatusObserver } from "./status";

import { StatusObservable } from "./status";

export class ConnectSourceService {
  private readonly accessAdaptersFactory: AccessAdaptersFactory;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;
  private source?: Source;
  private readonly statusObservable: StatusObservable;

  constructor(options: { accessAdaptersFactory: AccessAdaptersFactory, nodes: Nodes, }) {
    const { accessAdaptersFactory, nodes } = options;
    this.nodes = nodes;
    this.accessAdaptersFactory = accessAdaptersFactory;
    this.statusObservable = new StatusObservable();
  }

  async connect(provider: SourceProvider) {

    const accessAdapter = this.accessAdaptersFactory.create(provider);
    this.source = sources[provider];
    this.fileSystemAdapter = await accessAdapter.request();

    this.reset();

    this.statusObservable.next({
      fileSystemAdapter: this.fileSystemAdapter,
      nodes: this.nodes,
      source: this.source,
      status: "connected"
    });
  }

  disconnect() {
    this.statusObservable.next({ status: "disconnected" });

    this.fileSystemAdapter = undefined;
    this.nodes.clear();
  }

  reconnect() {
    this.reset();

    const { fileSystemAdapter, source } = this.inject();

    this.statusObservable.next({
      fileSystemAdapter,
      nodes: this.nodes,
      source,
      status: "reconnected"
    });
  }

  subscribe(observer: StatusObserver) {
    return this.statusObservable.subscribe(observer);
  }

  private inject() {
    if (!this.fileSystemAdapter) throwError("FILE_SYSTEM_ADAPTER_NOT_PROVIDED");
    if (!this.source) throwError("SOURCE_NOT_PROVIDED");
    return {
      fileSystemAdapter: this.fileSystemAdapter,
      source: this.source
    };
  }

  private reset() {
    const { fileSystemAdapter } = this.inject();

    const rootOptions = fileSystemAdapter.resetToRootOnly();
    const rootDirectory = createNode({ nodes: this.nodes, ...rootOptions });

    this.nodes.clear();
    this.nodes.set(rootDirectory);

    return true;
  };

}