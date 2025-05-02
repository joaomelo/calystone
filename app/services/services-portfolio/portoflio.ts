import type { AccessAdaptersFactory, AvailabilityFacade, ExportAdapter, ShareAdapter } from "@/infra";
import type { ObserverOptions } from "@/services/connect-source-service";
import type { CreateArtifactService } from "@/services/create-artifact-service";
import type { CreateDirectoryService } from "@/services/create-directory-service";
import type { EnsureDescriptorService } from "@/services/ensure-descriptor";
import type { NodeMoveService } from "@/services/node-move-service";
import type { NodeRemoveService } from "@/services/node-remove-service";
import type { NodeRenameService } from "@/services/node-rename-service";
import type { OpenDirectoryService } from "@/services/open-directory-service";

import { Nodes } from "@/domain";
import { AvailSourceService } from "@/services/avail-source-service";
import { ConnectSourceService } from "@/services/connect-source-service";
import { ConnectedCreateArtifactService, NullCreateArtifactService } from "@/services/create-artifact-service";
import { ConnectedCreateDirectoryService, NullCreateDirectoryService } from "@/services/create-directory-service";
import { ConnectedEnsureDescriptorService, NullEnsureDescriptorService } from "@/services/ensure-descriptor";
import { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ExportNodeService } from "@/services/export-node-service";
import { LoadNodesService } from "@/services/load-nodes-service";
import { ConnectedNodeMoveService, NullNodeMoveService } from "@/services/node-move-service";
import { ConnectedNodeRemoveService, NullNodeRemoveService } from "@/services/node-remove-service";
import { ConnectedNodeRenameService, NullNodeRenameService } from "@/services/node-rename-service";
import { ConnectedOpenDirectoryService, NullOpenDirectoryService } from "@/services/open-directory-service";
import { ShareNodeService } from "@/services/share-node-service";

import type { Options } from "./options";

import { ComputeTagsService } from "../compute-tags-service";

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
  nodeMove: NodeMoveService;
  nodeRemove: NodeRemoveService;
  nodeRename: NodeRenameService;
  nodes: Nodes;
  openDirectory: OpenDirectoryService;
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
    this.loadNodes = new LoadNodesService();
    this.computeTags = new ComputeTagsService(this.nodes);

    this.openDirectory = new NullOpenDirectoryService();
    this.ensureDescriptor = new NullEnsureDescriptorService();
    this.exchangeArtifact = new ExchangeArtifactService();
    this.nodeRename = new NullNodeRenameService();
    this.nodeRemove = new NullNodeRemoveService();
    this.nodeMove = new NullNodeMoveService();
    this.createDirectory = new NullCreateDirectoryService();
    this.createArtifact = new NullCreateArtifactService();

    this.connectSource.subscribe((options) => { this.rotateServices(options); });
  }

  rotateServices(options: ObserverOptions) {
    if (options.status === "disconnected" ) {
      this.openDirectory = new NullOpenDirectoryService();
      this.nodeRename = new NullNodeRenameService();
      this.nodeRemove = new NullNodeRemoveService();
      this.nodeMove = new NullNodeMoveService();
      this.createDirectory = new NullCreateDirectoryService();
      this.createArtifact = new NullCreateArtifactService();
      this.ensureDescriptor = new NullEnsureDescriptorService();

      this.loadNodes.stop();
      return;
    }

    const { fileSystemAdapter, nodes } = options;

    this.ensureDescriptor = new ConnectedEnsureDescriptorService(this.exchangeArtifact);
    this.openDirectory = new ConnectedOpenDirectoryService({ ensureDescriptor: this.ensureDescriptor, fileSystemAdapter, nodes });
    this.nodeRename = new ConnectedNodeRenameService({ fileSystemAdapter, nodes });
    this.nodeRemove = new ConnectedNodeRemoveService({ fileSystemAdapter, nodes });
    this.nodeMove = new ConnectedNodeMoveService(fileSystemAdapter);
    this.createDirectory = new ConnectedCreateDirectoryService({ fileSystemAdapter, nodes, openDirectory: this.openDirectory });
    this.createArtifact = new ConnectedCreateArtifactService({ exchangeArtifact: this.exchangeArtifact, fileSystemAdapter, nodes, openDirectory: this.openDirectory });

    this.exchangeArtifact.provide({ fileSystemAdapter });
    this.loadNodes.provide({ exchangeArtifact: this.exchangeArtifact, nodes, openDirectory: this.openDirectory });
    this.loadNodes.start();
  };
}
