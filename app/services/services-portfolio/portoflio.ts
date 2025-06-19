import type { AccessAdaptersFactory, AvailabilityFacade, ExportAdapter, ShareAdapter } from "@/infra";
import type { ObserverOptions } from "@/services/connect-source-service";

import { Nodes } from "@/domain";
import { AvailSourceService } from "@/services/avail-source-service";
import { ComputeTagsService } from "@/services/compute-tags-service";
import { ConnectSourceService } from "@/services/connect-source-service";
import { CreateArtifactService } from "@/services/create-artifact-service";
import { CreateDirectoryService } from "@/services/create-directory-service";
import { EnsureDescriptorService } from "@/services/ensure-descriptor-service";
import { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ExportNodeService } from "@/services/export-node-service";
import { MoveNodeService } from "@/services/move-node-service";
import { OpenDirectoryService } from "@/services/open-directory-service";
import { PreloadNodesService } from "@/services/preload-nodes-service";
import { RemoveNodeService } from "@/services/remove-node-service";
import { RenameNodeService } from "@/services/rename-node-service";
import { RetrieveNodesService } from "@/services/retrieve-nodes-service";
import { ShareNodeService } from "@/services/share-node-service";
import { TrackTodosService } from "@/services/track-todos-service";

import type { Options } from "./options";

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
  moveNode: MoveNodeService;
  nodes: Nodes;
  openDirectory: OpenDirectoryService;
  preloadNodes: PreloadNodesService;
  removeNode: RemoveNodeService;
  renameNode: RenameNodeService;
  retrieveNodes: RetrieveNodesService;
  shareAdapter: ShareAdapter;
  shareNode: ShareNodeService;
  trackTodos: TrackTodosService;

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
    this.computeTags = new ComputeTagsService(this.nodes);
    this.retrieveNodes = new RetrieveNodesService(this.nodes);
    this.exchangeArtifact = new ExchangeArtifactService();
    this.ensureDescriptor = new EnsureDescriptorService(this.exchangeArtifact);
    this.openDirectory = new OpenDirectoryService({ ensureDescriptor: this.ensureDescriptor, nodes: this.nodes });
    this.renameNode = new RenameNodeService(this.nodes);
    this.removeNode = new RemoveNodeService(this.nodes);
    this.moveNode = new MoveNodeService();
    this.createDirectory = new CreateDirectoryService({ nodes: this.nodes, openDirectory: this.openDirectory });
    this.createArtifact = new CreateArtifactService({ exchangeArtifact: this.exchangeArtifact, nodes: this.nodes, openDirectory: this.openDirectory });
    this.trackTodos = new TrackTodosService(this.nodes);
    this.preloadNodes = new PreloadNodesService({
      connectSource: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      nodes: this.nodes,
      openDirectory: this.openDirectory,
      preloadEnabled: options.preloadEnabled,
    });

    this.connectSource.subscribe((options) => {
      this.rotateServices(options);
    });
  }

  rotateServices(options: ObserverOptions) {
    if (options.status === "disconnected") return;
    if (options.status === "reconnected") return;

    const { fileSystemAdapter } = options;
    this.renameNode.provide(fileSystemAdapter);
    this.removeNode.provide(fileSystemAdapter);
    this.moveNode.provide(fileSystemAdapter);
    this.openDirectory.provide(fileSystemAdapter);
    this.createDirectory.provide(fileSystemAdapter);
    this.createArtifact.provide(fileSystemAdapter);
    this.exchangeArtifact.provide(fileSystemAdapter);
  };
}
