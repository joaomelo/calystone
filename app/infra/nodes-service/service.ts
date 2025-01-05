import type { Nodes, NodesRepository } from "@/domain";
import type { Configuration } from "@/utils";

import { DropboxAccessService, FsaAccessService, GoogleIdentityAccessService, MemoryAccessService, MsalAccessService } from "@/infra/access-services";
import { FsaNodesRepository, MemoryNodesRepository, OneDriveNodesRepository } from "@/infra/nodes-repositories";
import { throwCritical } from "@/utils";

export type Service = "dropbox" | "fsa" | "googleDrive" | "memory" | "oneDrive";

export class NodesService {
  dropbox: DropboxAccessService;
  fsa: FsaAccessService;
  googleDrive: GoogleIdentityAccessService;
  memory: MemoryAccessService;
  nodes: Nodes;
  oneDrive: MsalAccessService;

  constructor(nodes: Nodes, configuration: Configuration) {
    this.nodes = nodes;

    const msalClientId = configuration.get("msalClientId");
    const redirectUri = configuration.get("authRedirectUri");
    if (typeof msalClientId !== "string") {
      throwCritical("NO_MSAL_CLIENT_ID", "msal client id is not configured");
    }
    if (typeof redirectUri !== "string") {
      throwCritical("NO_REDIRECT_URI", "auth redirect uri is not configured");
    }

    this.dropbox = new DropboxAccessService();
    this.googleDrive = new GoogleIdentityAccessService();
    this.fsa = new FsaAccessService();
    this.memory = new MemoryAccessService(configuration.is("enableMemory"));
    this.oneDrive = new MsalAccessService(msalClientId, redirectUri);
  }

  active(service: Service) {
    switch (service) {
      case "dropbox":
        return this.dropbox.active();
      case "fsa":
        return this.fsa.active();
      case "googleDrive":
        return this.googleDrive.active();
      case "memory":
        return this.memory.active();
      case "oneDrive":
        return this.oneDrive.active();
    }
  }

  async bootstrap(service: Service) {
    let repository: NodesRepository;

    switch (service) {
      case "dropbox":
      case "googleDrive": {
        throwCritical("SERVICE_NOT_IMPLEMENTED", ` ${service} service is not implemented`);
        break;
      }
      case "fsa":{
        const accessData = await this.fsa.access();
        repository = new FsaNodesRepository(accessData);
        break;
      }
      case "memory": {
        repository = new MemoryNodesRepository();
        break;
      }
      case "oneDrive": {
        const accessData = await this.oneDrive.access();
        repository = new OneDriveNodesRepository(accessData);
        break;
      }
    }

    this.nodes.connect(repository);
  }
}