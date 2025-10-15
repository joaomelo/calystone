import type {
  AccessAdaptersFactory,
  AvailabilityFacade,
  ExportAdapter,
  FileSystemAdaptersFactory,
  ShareAdapter
} from "@/infra";

import { AvailSourceService } from "@/services/avail-source-service";
import { ConnectSourceService } from "@/services/connect-source-service";
import { CreateNodeService } from "@/services/create-node-service";
import { EnsureDescriptorService } from "@/services/ensure-descriptor-service";
import { ExchangeArtifactService } from "@/services/exchange-artifact-service";
import { ExportNodeService } from "@/services/export-node-service";
import { MoveNodeService } from "@/services/move-node-service";
import { OpenDirectoryService } from "@/services/open-directory-service";
import { PreloadNodesService } from "@/services/preload-nodes-service";
import { ReloadDirectoryService } from "@/services/reload-directory-service";
import { RemoveNodeService } from "@/services/remove-node-service";
import { RenameNodeService } from "@/services/rename-node-service";
import { ShareNodeService } from "@/services/share-node-service";
import { SpawnCollectionsService } from "@/services/spawn-collections-service";

export class ServicesPortfolio {
  availSource: AvailSourceService;
  connectSource: ConnectSourceService;
  createNode: CreateNodeService;
  ensureDescriptor: EnsureDescriptorService;
  exchangeArtifact: ExchangeArtifactService;
  exportNode: ExportNodeService;
  moveNode: MoveNodeService;
  openDirectory: OpenDirectoryService;
  preloadNodes: PreloadNodesService;
  reloadDirectory: ReloadDirectoryService;
  removeNode: RemoveNodeService;
  renameNode: RenameNodeService;
  spawnCollections: SpawnCollectionsService;
  shareNode: ShareNodeService;

  constructor(
    options: {
      accessAdaptersFactory: AccessAdaptersFactory;
      availabilityFacade: AvailabilityFacade;
      exportAdapter: ExportAdapter;
      fileSystemAdaptersFactory: FileSystemAdaptersFactory;
      preloadEnabled: boolean;
      shareAdapter: ShareAdapter;
    }
  ) {
    const {
      accessAdaptersFactory,
      availabilityFacade,
      exportAdapter,
      fileSystemAdaptersFactory,
      preloadEnabled,
      shareAdapter,
    } = options;

    this.availSource = new AvailSourceService(availabilityFacade);
    this.exportNode = new ExportNodeService(exportAdapter);
    this.shareNode = new ShareNodeService(shareAdapter);

    this.connectSource = new ConnectSourceService({
      accessAdaptersFactory,
      fileSystemAdaptersFactory,
    });
    this.spawnCollections = new SpawnCollectionsService(this.connectSource);

    this.exchangeArtifact = new ExchangeArtifactService(this.connectSource);
    this.ensureDescriptor = new EnsureDescriptorService({
      connectSourceService: this.connectSource,
      exchangeArtifact: this.exchangeArtifact
    });
    this.openDirectory = new OpenDirectoryService({
      connectSourceService: this.connectSource,
      ensureDescriptor: this.ensureDescriptor
    });
    this.createNode = new CreateNodeService({
      connectSourceService: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      openDirectory: this.openDirectory,
      spawnCollectionsService: this.spawnCollections
    });
    this.preloadNodes = new PreloadNodesService({
      connectSource: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      openDirectory: this.openDirectory,
      preloadEnabled,
    });
    this.reloadDirectory = new ReloadDirectoryService({
      connectSourceService: this.connectSource,
      openDirectory: this.openDirectory,
      spawnCollectionsService: this.spawnCollections
    });
    this.moveNode = new MoveNodeService({
      connectSourceService: this.connectSource,
      spawnCollectionsService: this.spawnCollections
    });
    this.removeNode = new RemoveNodeService({
      connectSourceService: this.connectSource,
      spawnCollectionsService: this.spawnCollections
    });
    this.renameNode = new RenameNodeService({
      connectSourceService: this.connectSource,
      spawnCollectionsService: this.spawnCollections
    });
  }
}
