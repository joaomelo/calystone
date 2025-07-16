import type { Directory } from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { EnsureDescriptorService } from "@/services/ensure-descriptor-service";

export class ReloadDirectoryService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly ensureDescriptor: EnsureDescriptorService;

  constructor(options: {
    connectSourceService: ConnectSourceService;
    ensureDescriptor: EnsureDescriptorService,
  }) {
    this.ensureDescriptor = options.ensureDescriptor;
    this.connectSourceService = options.connectSourceService;
  }

  reload(directory: Directory) {
    console.log({ directory });
    return Promise.resolve();
  }
}