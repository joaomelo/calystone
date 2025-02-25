import type { Nodes } from "@/domain";
import type { AdaptersPortfolio, FileSystemAdapter } from "@/services/adapters";
import type { Source } from "@/services/source";

import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

interface Options {
  nodes: Nodes,
  adaptersPortfolio: AdaptersPortfolio
}

export class ConnectionService {
  private readonly adaptersPortfolio: AdaptersPortfolio;
  private fileSystemAdapter?: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor({ adaptersPortfolio, nodes }: Options) {
    this.adaptersPortfolio = adaptersPortfolio;
    this.nodes = nodes;
  }

  async connect(source: Source) {
    const sourceAdapter = this.adaptersPortfolio.get(source);
    this.fileSystemAdapter = await sourceAdapter.getFileSystemAdapter();
    this.reset(this.fileSystemAdapter);
  }

  disconnect() {
    this.nodes.clear();
    this.fileSystemAdapter?.reset();
    this.fileSystemAdapter = undefined;
  }

  isConnected(): boolean {
    return this.fileSystemAdapter !== undefined;
  }

  reconect() {
    const fileSystemAdapter = this.fileSystemAdapter;
    if (!fileSystemAdapter) throwCritical("NO_FILE_SYSTEM_ADAPTER", "the connection must have a file system adapter to reconect");

    this.reset(fileSystemAdapter);
  }

  private reset(fileSytemAdapter: FileSystemAdapter) {
    this.disconnect();

    this.fileSystemAdapter = fileSytemAdapter;

    const { rootData } = this.fileSystemAdapter;
    const rootDirectory = new Directory({ nodes: this.nodes, ...rootData });
    this.nodes.set(rootDirectory);
  }

}