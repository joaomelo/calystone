import type {
  AccessAdaptersFactory,
  AvailabilityFacade,
  ExportAdapter,
  FileSystemAdaptersFactory,
  ShareAdapter
} from "@/infra";

import { AvailSourceService } from "@/services/avail-source-service";
import { ComputeCriteriaService } from "@/services/compute-criteria-service";
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
import { QueryHierarchyService } from "@/services/query-hierarchy-service";
import { ReloadDirectoryService } from "@/services/reload-directory-service";
import { RemoveNodeService } from "@/services/remove-node-service";
import { RenameNodeService } from "@/services/rename-node-service";
import { RetrieveNodesService } from "@/services/retrieve-nodes-service";
import { ShareNodeService } from "@/services/share-node-service";
import { TrackTodosService } from "@/services/track-todos-service";

export class ServicesPortfolio {
  availSource: AvailSourceService;
  computeCriteria: ComputeCriteriaService;
  computeTags: ComputeTagsService;
  connectSource: ConnectSourceService;
  createArtifact: CreateArtifactService;
  createDirectory: CreateDirectoryService;
  ensureDescriptor: EnsureDescriptorService;
  exchangeArtifact: ExchangeArtifactService;
  exportNode: ExportNodeService;
  moveNode: MoveNodeService;
  openDirectory: OpenDirectoryService;
  preloadNodes: PreloadNodesService;
  queryHierarchy: QueryHierarchyService;
  reloadDirectory: ReloadDirectoryService;
  removeNode: RemoveNodeService;
  renameNode: RenameNodeService;
  retrieveNodes: RetrieveNodesService;
  shareNode: ShareNodeService;
  trackTodos: TrackTodosService;

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

    this.connectSource = new ConnectSourceService({
      accessAdaptersFactory,
      fileSystemAdaptersFactory,
    });
    this.availSource = new AvailSourceService(availabilityFacade);
    this.retrieveNodes = new RetrieveNodesService(this.connectSource);
    this.computeCriteria = new ComputeCriteriaService(this.retrieveNodes);
    this.computeTags = new ComputeTagsService(this.retrieveNodes);
    this.exchangeArtifact = new ExchangeArtifactService(this.connectSource);
    this.ensureDescriptor = new EnsureDescriptorService({
      connectSourceService: this.connectSource,
      exchangeArtifact: this.exchangeArtifact
    });
    this.openDirectory = new OpenDirectoryService({
      connectSourceService: this.connectSource,
      ensureDescriptor: this.ensureDescriptor
    });
    this.createArtifact = new CreateArtifactService({
      connectSourceService: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      openDirectory: this.openDirectory
    });
    this.createDirectory = new CreateDirectoryService({
      connectSourceService: this.connectSource,
      openDirectory: this.openDirectory
    });
    this.exportNode = new ExportNodeService(exportAdapter);
    this.moveNode = new MoveNodeService(this.connectSource);
    this.preloadNodes = new PreloadNodesService({
      connectSource: this.connectSource,
      exchangeArtifact: this.exchangeArtifact,
      openDirectory: this.openDirectory,
      preloadEnabled,
    });
    this.queryHierarchy = new QueryHierarchyService(this.connectSource);
    this.reloadDirectory = new ReloadDirectoryService({
      connectSourceService: this.connectSource,
      ensureDescriptor: this.ensureDescriptor
    });
    this.removeNode = new RemoveNodeService(this.connectSource);
    this.renameNode = new RenameNodeService(this.connectSource);
    this.shareNode = new ShareNodeService(shareAdapter);
    this.trackTodos = new TrackTodosService(this.retrieveNodes);
  }
}
