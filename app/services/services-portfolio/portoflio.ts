import type { AccessAdaptersFactory, AvailabilityFacade, ExportAdapter, ShareAdapter } from "@/infra";
import type { ObserverOptions } from "@/services/connect-source-service";

import { Nodes } from "@/domain";
import { AvailSourceService } from "@/services/avail-source-service";
import { ConnectSourceService } from "@/services/connect-source-service";
import { CreateArtifactService } from "@/services/create-artifact-service";
import { CreateDirectoryService } from "@/services/create-directory-service";
import { EnsureDescriptorService } from "@/services/ensure-descriptor";
import { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ExportNodeService } from "@/services/export-node-service";
import { LoadNodesService } from "@/services/load-nodes-service";
import { MoveNodeService } from "@/services/move-node-service";
import { OpenDirectoryService } from "@/services/open-directory-service";
import { RemoveNodeService } from "@/services/remove-node-service";
import { RenameNodeService } from "@/services/rename-node-service";
import { ShareNodeService } from "@/services/share-node-service";

import type { Options } from "./options";

import { ComputeTagsService } from "../compute-tags-service";
import { SearchNodesService } from "../search-nodes";

export class ServicesPortolfio {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;
  availSource: AvailSourceService;
  computeTags: ComputeTagsService;
  connectSource: ConnectSourceService;
  createArtifact: CreateArtifactService;
  createDirectory: CreateDirectoryService;
  ensureDescriptor: EnsureDescriptorService;
  exchangeArtifact: ExchangeArtifactService;
  exportAdapter: ExportAdapter;
  exportNode: ExportNodeService;
  loadNodes: LoadNodesService;
  moveNode: MoveNodeService;
  nodes: Nodes;
  openDirectory: OpenDirectoryService;
  removeNode: RemoveNodeService;
  renameNode: RenameNodeService;
  searchNodes: SearchNodesService;
  shareAdapter: ShareAdapter;
  shareNode: ShareNodeService;

  constructor(options: Options) {
    this.accessAdaptersFactory = options.accessAdaptersFactory;
    this.availabilityFacade = options.availabilityFacade;
    this.shareAdapter = options.shareAdapter;
    this.exportAdapter = options.exportAdapter;

    this.nodes = new Nodes();

    this.availSource = new AvailSourceService(this.availabilityFacade);
    this.connectSource = new ConnectSourceService({ accessAdaptersFactory: this.accessAdaptersFactory, nodes: this.nodes });
    this.shareNode = new ShareNodeService(this.shareAdapter);
    this.exportNode = new ExportNodeService(this.exportAdapter);
    this.loadNodes = new LoadNodesService(this.nodes);
    this.computeTags = new ComputeTagsService(this.nodes);
    this.searchNodes = new SearchNodesService(this.nodes);
    this.exchangeArtifact = new ExchangeArtifactService();
    this.ensureDescriptor = new EnsureDescriptorService(this.exchangeArtifact);
    this.openDirectory = new OpenDirectoryService({ ensureDescriptor: this.ensureDescriptor, nodes: this.nodes });
    this.renameNode = new RenameNodeService(this.nodes);
    this.removeNode = new RemoveNodeService(this.nodes);
    this.moveNode = new MoveNodeService();
    this.createDirectory = new CreateDirectoryService({ nodes: this.nodes, openDirectory: this.openDirectory });
    this.createArtifact = new CreateArtifactService({ exchangeArtifact: this.exchangeArtifact, nodes: this.nodes, openDirectory: this.openDirectory });

    this.connectSource.subscribe((options) => { this.rotateServices(options); });
  }

  rotateServices(options: ObserverOptions) {
    if (options.status === "disconnected" ) {
      this.loadNodes.stop();
      return;
    }

    const { fileSystemAdapter } = options;

    this.renameNode.provide(fileSystemAdapter);
    this.removeNode.provide(fileSystemAdapter);
    this.moveNode.provide(fileSystemAdapter);
    this.openDirectory.provide(fileSystemAdapter);
    this.createDirectory.provide(fileSystemAdapter);
    this.createArtifact.provide(fileSystemAdapter);
    this.exchangeArtifact.provide(fileSystemAdapter);
    this.loadNodes.provide({ exchangeArtifact: this.exchangeArtifact, openDirectory: this.openDirectory });
  };
}
