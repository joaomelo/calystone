import type { AccessAdaptersFactory, FileSystemAdaptersFactory, SourceProvider } from "@/infra";

import { Nodes } from "@/domain";
import { createNode } from "@/domain";
import { sources } from "@/infra";
import { throwCritical } from "@/utils";
import { BehaviorSubject } from "rxjs";

import type { ConnectionState } from "./state";

export class ConnectSourceService {
  private readonly accessAdaptersFactory: AccessAdaptersFactory;
  private readonly fileSystemAdaptersFactory: FileSystemAdaptersFactory;
  private readonly observable: BehaviorSubject<ConnectionState>;

  constructor(options:{
    accessAdaptersFactory: AccessAdaptersFactory,
    fileSystemAdaptersFactory: FileSystemAdaptersFactory
  }) {
    this.accessAdaptersFactory = options.accessAdaptersFactory;
    this.fileSystemAdaptersFactory = options.fileSystemAdaptersFactory;
    this.observable = new BehaviorSubject<ConnectionState>({
      fileSystemAdapter: undefined,
      nodes: undefined,
      source: undefined,
      status: "disconnected"
    });
  }

  async connect(provider: SourceProvider) {
    const source = sources[provider];
    const nodes = new Nodes();

    const accessAdapter = this.accessAdaptersFactory.create(provider);
    const accessData = await accessAdapter.request();
    const fileSystemAdapter = this.fileSystemAdaptersFactory.create({
      accessData,
      nodes,
      provider
    });

    const rootOptions = fileSystemAdapter.resetToRootOnly();
    const rootDirectory = createNode(rootOptions);

    nodes.clear();
    nodes.set(rootDirectory);

    this.observable.next({
      fileSystemAdapter,
      nodes,
      source,
      status: "connected"
    });
  }

  disconnect() {
    this.observable.next({
      fileSystemAdapter: undefined,
      nodes: undefined,
      source: undefined,
      status: "disconnected"
    });
  }

  reconnect() {
    const { fileSystemAdapter, nodes } = this.stateConnectedOrThrow();

    const rootOptions = fileSystemAdapter.resetToRootOnly();
    const rootDirectory = createNode(rootOptions);

    nodes.clear();
    nodes.set(rootDirectory);
  }

  state() {
    return this.observable.value;
  }

  stateConnectedOrThrow() {
    const state = this.state();
    if (state.status !== "connected") throwCritical("NOT_CONNECTED");
    return state;
  }

  subscribe(observer: (state: ConnectionState) => void) {
    return this.observable.subscribe(observer);
  }
}