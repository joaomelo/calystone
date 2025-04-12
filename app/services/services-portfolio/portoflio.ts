import type { AccessAdaptersFactory, AvailabilityFacade, ExportAdapter, ShareAdapter } from "@/infra";
import type { ObserverOptions } from "@/services/connect-source-service";
import type { CreateArtifactService } from "@/services/create-artifact-service";
import type { CreateDirectoryService } from "@/services/create-directory-service";
import type { DirectoryOpenService } from "@/services/directory-open-service";
import type { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import type { ExchangeTextService } from "@/services/exchange-text-service";
import type { NodeMoveService } from "@/services/node-move-service";
import type { NodeRemoveService } from "@/services/node-remove-service";
import type { NodeRenameService } from "@/services/node-rename-service";

import { Nodes } from "@/domain";
import { AvailSourceService } from "@/services/avail-source-service";
import { ConnectSourceService } from "@/services/connect-source-service";
import { ConnectedCreateArtifactService, NullCreateArtifactService } from "@/services/create-artifact-service";
import { ConnectedCreateDirectoryService, NullCreateDirectoryService } from "@/services/create-directory-service";
import { ConnectedDirectoryOpenService, NullDirectoryOpenService } from "@/services/directory-open-service";
import { ConnectedExchangeArtifactService, NullExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ConnectedExchangeTextService, NullExchangeTextService } from "@/services/exchange-text-service";
import { ExportNodeService } from "@/services/export-node-service";
import { ConnectedNodeMoveService, NullNodeMoveService } from "@/services/node-move-service";
import { ConnectedNodeRemoveService, NullNodeRemoveService } from "@/services/node-remove-service";
import { ConnectedNodeRenameService, NullNodeRenameService } from "@/services/node-rename-service";
import { ShareNodeService } from "@/services/share-node-service";

import type { Options } from "./options";

export class ServicesPortolfio {
  accessAdaptersFactory: AccessAdaptersFactory;
  availabilityFacade: AvailabilityFacade;
  availSource: AvailSourceService;
  connectSource: ConnectSourceService;
  createArtifact: CreateArtifactService;
  createDirectory: CreateDirectoryService;
  directoryOpen: DirectoryOpenService;
  exchangeArtifact: ExchangeArtifactService;
  exchangeText: ExchangeTextService;
  exportAdapter: ExportAdapter;
  exportNode: ExportNodeService;
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
    this.exportAdapter = options.exportAdapter;

    this.nodes = new Nodes();

    this.availSource = new AvailSourceService(this.availabilityFacade);
    this.connectSource = new ConnectSourceService({ accessAdaptersFactory: this.accessAdaptersFactory, nodes: this.nodes });
    this.shareNode = new ShareNodeService(this.shareAdapter);
    this.exportNode = new ExportNodeService(this.exportAdapter);

    this.directoryOpen = new NullDirectoryOpenService();
    this.exchangeArtifact = new NullExchangeArtifactService();
    this.exchangeText = new NullExchangeTextService();
    this.nodeRename = new NullNodeRenameService();
    this.nodeRemove = new NullNodeRemoveService();
    this.nodeMove = new NullNodeMoveService();
    this.createDirectory = new NullCreateDirectoryService();
    this.createArtifact = new NullCreateArtifactService();

    this.connectSource.subscribe((options) => { this.rotateServices(options); });
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
      return;
    }

    const { fileSystemAdapter, nodes } = options;

    this.directoryOpen = new ConnectedDirectoryOpenService({ fileSystemAdapter, nodes });
    this.exchangeArtifact = new ConnectedExchangeArtifactService(fileSystemAdapter);
    this.exchangeText = new ConnectedExchangeTextService(this.exchangeArtifact);
    this.nodeRename = new ConnectedNodeRenameService({ fileSystemAdapter, nodes });
    this.nodeRemove = new ConnectedNodeRemoveService({ fileSystemAdapter, nodes });
    this.nodeMove = new ConnectedNodeMoveService(fileSystemAdapter);
    this.createDirectory = new ConnectedCreateDirectoryService({ directoryOpen: this.directoryOpen, fileSystemAdapter, nodes });
    this.createArtifact = new ConnectedCreateArtifactService({ directoryOpen: this.directoryOpen, exchangeArtifact: this.exchangeArtifact, fileSystemAdapter, nodes });
  };
}
