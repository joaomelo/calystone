import type { Nodes } from "@/domain";
import type { AdaptersPortfolio, FileSystemAdapter } from "@/services/adapters";
import type { Source } from "@/services/source";

import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

import { Status } from "./status";

interface Options {
  nodes: Nodes,
  adaptersPortfolio: AdaptersPortfolio
}

export class ConnectionService {
  status: Status;
  private readonly adaptersPortfolio: AdaptersPortfolio;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor({ adaptersPortfolio, nodes }: Options) {
    this.adaptersPortfolio = adaptersPortfolio;
    this.nodes = nodes;
    this.status = new Status();
  }

  async connect(source: Source) {
    const sourceAdapter = this.adaptersPortfolio.get(source);
    this.fileSystemAdapter = await sourceAdapter.getFileSystemAdapter();
    this.reset(this.fileSystemAdapter);
    this.status.next({ fileSystemAdapter: this.fileSystemAdapter, value: "connected" });
  }

  disconnect() {
    this.status.next({ value: "disconnected" });
    this.reset();
  }

  reconect() {
    const fileSystemAdapter = this.fileSystemAdapter;
    if (!fileSystemAdapter) throwCritical("NO_FILE_SYSTEM_ADAPTER", "the connection must have a file system adapter to reconect");

    this.reset(fileSystemAdapter);
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