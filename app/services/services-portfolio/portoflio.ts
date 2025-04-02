import type { SourceAdapterPortfolio } from "@/infra";
import type { ArtifactTextService } from "@/services/artifact-text-service";
import type { ObserverOptions } from "@/services/connection-service";
import type { CreateDirectoryService } from "@/services/create-directory-service";
import type { CreateFileService } from "@/services/create-file-service";
import type { DirectoryOpenService } from "@/services/directory-open-service";
import type { NodeMoveService } from "@/services/node-move-service";
import type { NodeRemoveService } from "@/services/node-remove-service";
import type { NodeRenameService } from "@/services/node-rename-service";

import { Nodes } from "@/domain";
import { AccessRequestService } from "@/services/access-request-service";
import { ConnectedArtifactTextService, NullArtifactTextService } from "@/services/artifact-text-service";
import { ConnectionService } from "@/services/connection-service";
import { ConnectedCreateDirectoryService, NullCreateDirectoryService } from "@/services/create-directory-service";
import { ConnectedCreateFileService, NullCreateFileService } from "@/services/create-file-service";
import { ConnectedDirectoryOpenService, NullDirectoryOpenService } from "@/services/directory-open-service";
import { ConnectedNodeMoveService, NullNodeMoveService } from "@/services/node-move-service";
import { ConnectedNodeRemoveService, NullNodeRemoveService } from "@/services/node-remove-service";
import { ConnectedNodeRenameService, NullNodeRenameService } from "@/services/node-rename-service";

export class ServicesPortolfio {
  accessRequest: AccessRequestService;
  artifactText: ArtifactTextService;
  connection: ConnectionService;
  createDirectory: CreateDirectoryService;
  createFile: CreateFileService;
  directoryOpen: DirectoryOpenService;
  nodeMove: NodeMoveService;
  nodeRemove: NodeRemoveService;
  nodeRename: NodeRenameService;
  nodes: Nodes;
  sourceAdapterPortfolio: SourceAdapterPortfolio;

  constructor(SourceAdapterPortfolio: SourceAdapterPortfolio) {
    this.sourceAdapterPortfolio = SourceAdapterPortfolio;

    this.nodes = new Nodes();
    this.accessRequest = new AccessRequestService(SourceAdapterPortfolio);
    this.connection = new ConnectionService({ nodes: this.nodes, sourceAdapterPortfolio: SourceAdapterPortfolio });

    this.directoryOpen = new NullDirectoryOpenService();
    this.artifactText = new NullArtifactTextService();
    this.nodeRename = new NullNodeRenameService();
    this.nodeRemove = new NullNodeRemoveService();
    this.nodeMove = new NullNodeMoveService();
    this.createDirectory = new NullCreateDirectoryService();
    this.createFile = new NullCreateFileService();

    this.connection.subscribe((options) => { this.rotateServices(options); });
  }

  rotateServices(options: ObserverOptions) {
    if (options.status === "disconnected" ) {
      this.directoryOpen = new NullDirectoryOpenService();
      this.artifactText = new NullArtifactTextService();
      this.nodeRename = new NullNodeRenameService();
      this.nodeRemove = new NullNodeRemoveService();
      this.nodeMove = new NullNodeMoveService();
      this.createDirectory = new NullCreateDirectoryService();
      this.createFile = new NullCreateFileService();
      return;
    }

    const sourceAdapter = this.sourceAdapterPortfolio.get(options.source);
    const fileSystemAdapter = sourceAdapter.getOrThrowFileSystemAdapter();
    const supportAdapter = sourceAdapter.getSupport();
    const nodes = this.nodes;

    this.directoryOpen = new ConnectedDirectoryOpenService({ fileSystemAdapter, nodes });
    this.artifactText = new ConnectedArtifactTextService(fileSystemAdapter);
    this.nodeRename = new ConnectedNodeRenameService({ fileSystemAdapter, nodes, supportAdapter });
    this.nodeRemove = new ConnectedNodeRemoveService({ fileSystemAdapter, nodes, supportAdapter });
    this.nodeMove = new ConnectedNodeMoveService({ fileSystemAdapter, supportAdapter });
    this.createDirectory = new ConnectedCreateDirectoryService({ directoryOpen: this.directoryOpen, fileSystemAdapter, nodes, supportAdapter });
    this.createFile = new ConnectedCreateFileService({ directoryOpen: this.directoryOpen, fileSystemAdapter, nodes, supportAdapter });
  };
}
