import type { AccessAdaptersFactory, AvailabilityFacade, ShareAdapter } from "@/infra";
import type { ObserverOptions } from "@/services/connection-service";
import type { CreateArtifactService } from "@/services/create-artifact-service";
import type { CreateDirectoryService } from "@/services/create-directory-service";
import type { DirectoryOpenService } from "@/services/directory-open-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { ExchangeTextService } from "@/services/exchange-text-service";
import type { NodeMoveService } from "@/services/node-move-service";
import type { NodeRemoveService } from "@/services/node-remove-service";
import type { NodeRenameService } from "@/services/node-rename-service";
import type { ShareNodeService } from "@/services/share-node-service";

import { Nodes } from "@/domain";
import { AvailSourceService } from "@/services/avail-source-service";
import { ConnectionService } from "@/services/connection-service";
import { ConnectedCreateArtifactService, NullCreateArtifactService } from "@/services/create-artifact-service";
import { ConnectedCreateDirectoryService, NullCreateDirectoryService } from "@/services/create-directory-service";
import { ConnectedDirectoryOpenService, NullDirectoryOpenService } from "@/services/directory-open-service";
import { ConnectedExchangeArtifactService, NullExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ConnectedExchangeTextService, NullExchangeTextService } from "@/services/exchange-text-service";
import { ConnectedNodeMoveService, NullNodeMoveService } from "@/services/node-move-service";
import { ConnectedNodeRemoveService, NullNodeRemoveService } from "@/services/node-remove-service";
import { ConnectedNodeRenameService, NullNodeRenameService } from "@/services/node-rename-service";
import { RequestAccessService } from "@/services/request-access-service";
import { ConnectedShareNodeService, NullShareNodeService } from "@/services/share-node-service";

import type { Options } from "./options";

export class ServicesPortolfio {
  accessAdaptersFactory: AccessAdaptersFactory;
  accessRequest: RequestAccessService;
  availabilityFacade: AvailabilityFacade;
  availSource: AvailSourceService;
  connection: ConnectionService;
  createArtifact: CreateArtifactService;
  createDirectory: CreateDirectoryService;
  directoryOpen: DirectoryOpenService;
  exchangeArtifact: ExchangeArtifactService;
  exchangeText: ExchangeTextService;
  nodeMove: NodeMoveService;
  nodeRemove: NodeRemoveService;
  nodeRename: NodeRenameService;
  nodes: Nodes;
  shareAdapter: ShareAdapter;
  shareNode: ShareNodeService;

  constructor(options: Options) {
    this.accessAdaptersFactory = options.accessAdaptersFactory;
    this.availabilityFacade = options.availabilityFacade;
    this.shareAdapter = options.shareAdapter;

    this.nodes = new Nodes();

    this.availSource = new AvailSourceService(this.availabilityFacade);
    this.accessRequest = new RequestAccessService({
      accessAdaptersFactory: this.accessAdaptersFactory,
      availabilityFacade: this.availabilityFacade,
    });
    this.connection = new ConnectionService({ nodes: this.nodes });

    this.directoryOpen = new NullDirectoryOpenService();
    this.exchangeArtifact = new NullExchangeArtifactService();
    this.exchangeText = new NullExchangeTextService();
    this.nodeRename = new NullNodeRenameService();
    this.nodeRemove = new NullNodeRemoveService();
    this.nodeMove = new NullNodeMoveService();
    this.createDirectory = new NullCreateDirectoryService();
    this.createArtifact = new NullCreateArtifactService();
    this.shareNode = new NullShareNodeService();

    this.connection.subscribe((options) => { this.rotateServices(options); });
  }

  rotateServices(options: ObserverOptions) {
    if (options.status === "disconnected" ) {
      this.directoryOpen = new NullDirectoryOpenService();
      this.exchangeArtifact = new NullExchangeArtifactService();
      this.exchangeText = new NullExchangeTextService();
      this.nodeRename = new NullNodeRenameService();
      this.nodeRemove = new NullNodeRemoveService();
      this.nodeMove = new NullNodeMoveService();
      this.createDirectory = new NullCreateDirectoryService();
      this.createArtifact = new NullCreateArtifactService();
      this.shareNode = new NullShareNodeService();
      return;
    }

    const sourceAdapter = this.sourcesAdaptersPortfolio.get(options.source);
    const fileSystemAdapter = sourceAdapter.getOrThrowFileSystemAdapter();
    const supportAdapter = sourceAdapter.getSupport();
    const nodes = this.nodes;

    this.directoryOpen = new ConnectedDirectoryOpenService({ fileSystemAdapter, nodes });
    this.exchangeArtifact = new ConnectedExchangeArtifactService(fileSystemAdapter);
    this.exchangeText = new ConnectedExchangeTextService({ exchangeService: this.exchangeArtifact, fileSystemAdapter });
    this.nodeRename = new ConnectedNodeRenameService({ fileSystemAdapter, nodes, supportAdapter });
    this.nodeRemove = new ConnectedNodeRemoveService({ fileSystemAdapter, nodes, supportAdapter });
    this.nodeMove = new ConnectedNodeMoveService({ fileSystemAdapter, supportAdapter });
    this.createDirectory = new ConnectedCreateDirectoryService({ directoryOpen: this.directoryOpen, fileSystemAdapter, nodes, supportAdapter });
    this.createArtifact = new ConnectedCreateArtifactService({ directoryOpen: this.directoryOpen, exchangeArtifact: this.exchangeArtifact, fileSystemAdapter, nodes, supportAdapter });
    this.shareNode = new ConnectedShareNodeService({ fileSystemAdapter, supportAdapter });
  };
}
