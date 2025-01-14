import type { Nodes, NodesProvider } from "@/domain";
import type { Configuration } from "@/utils";

import { FsaNodesProvider, MemoryNodesProvider, OneDriveNodesProvider } from "@/infra/nodes-services";
import { throwCritical } from "@/utils";

import type { AccessName } from "./accesses";

import { assertsAccessData } from "./access-data";
import { AccessesPortfolio } from "./accesses";

export class NodesService {
  accessesPortfolio: AccessesPortfolio;
  nodes: Nodes;

  constructor(nodes: Nodes, configuration: Configuration) {
    this.nodes = nodes;
    this.accessesPortfolio = new AccessesPortfolio(configuration);
  }

  active(name: AccessName) {
    const access = this.accessesPortfolio.get(name);
    return access.active();
  }

  async bootstrap(name: AccessName) {
    let repository: NodesProvider;

    switch (name) {
      case "dropbox":
      case "googleDrive": {
        throwCritical("SERVICE_NOT_IMPLEMENTED", ` ${name} service is not implemented`);
        break;
      }
      case "fsa":{
        const accessData = this.fsa.acquire();
        assertsAccessData(accessData);
        repository = new FsaNodesProvider(accessData);
        break;
      }
      case "memory": {
        const accessData = this.memory.acquire();
        assertsAccessData(accessData);
        repository = new MemoryNodesProvider(accessData);
        break;
      }
      case "oneDrive": {
        const accessData = await this.oneDrive.acquire();
        assertsAccessData(accessData);
        repository = new OneDriveNodesProvider(accessData);
        break;
      }
    }

    this.nodes.connect(repository);
  }

  exit() {
    this.nodes.disconnect();
  }

  async request(service: Accesses) {
    switch (service) {
      case "dropbox": {
        this.dropbox.request();
        return;
      }
      case "fsa": {
        await this.fsa.request();
        return;
      }
      case "googleDrive": {
        this.googleDrive.request();
        return;
      }
      case "memory": {
        this.memory.request();
        return;
      }
      case "oneDrive": {
        await this.oneDrive.request();
        return;
      }
    }
  }
}