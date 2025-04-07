import type { Id } from "@/domain";
import type { Source } from "@/infra/source";
import type { SourceConfigurations } from "@/infra/source";
import type { SourceAdapter } from "@/infra/source-adapters";

import { createId } from "@/domain";
import { DropboxAvailabilityAdapter, FsaAvailabilityAdapter, MemoryAvailabilityAdapter, OneDriveAvailabilityAdapter } from "@/infra/availability-adapters";
import { DropboxSourceAdapter, FsaSourceAdapter, MemorySourceAdapter, OneDriveSourceAdapter } from "@/infra/source-adapters";
import { throwCritical } from "@/utils";

export class SourcesAdaptersPortfolio {
  configurations: SourceConfigurations;
  dropboxAvailability: DropboxAvailabilityAdapter;
  fsaAvailability: FsaAvailabilityAdapter;
  memoryAvailability: MemoryAvailabilityAdapter;
  oneDriveAvailability: OneDriveAvailabilityAdapter;
  sourcesAdapters: Map<Id, SourceAdapter>;

  constructor(configurations: SourceConfigurations) {
    this.configurations = configurations;
    this.sourcesAdapters = new Map();

    this.memoryAvailability = new MemoryAvailabilityAdapter(configurations.memory);
    this.fsaAvailability = new FsaAvailabilityAdapter();
    this.dropboxAvailability = new DropboxAvailabilityAdapter(configurations.dropbox);
    this.oneDriveAvailability = new OneDriveAvailabilityAdapter(configurations.oneDrive);
  }

  available(source: Source) {
    switch (source) {
      case "dropbox":
        return this.dropboxAvailability.available();
      case "fsa":
        return this.fsaAvailability.available();
      case "memory":
        return this.memoryAvailability.available();
      case "one-drive":
        return this.oneDriveAvailability.available();
    }
  }

  create(source: Source) {
    const available = this.available(source);
    available.throwOnFail();

    const id = createId();

    let adapter: SourceAdapter;
    switch (source) {
      case "dropbox":
        adapter = new DropboxSourceAdapter(this.configurations.dropbox);
        break;
      case "fsa":
        adapter = new FsaSourceAdapter();
        break;
      case "memory":
        adapter = new MemorySourceAdapter(this.configurations.memory);
        break;
      case "one-drive":
        adapter = new OneDriveSourceAdapter(this.configurations.oneDrive);
        break;
    }

    this.sourcesAdapters.set(id, adapter);

    return { adapter, id };
  }

  delete(id: Id) {
    this.sourcesAdapters.delete(id);
  }

  get(id: Id) {
    return this.sourcesAdapters.get(id);
  }

  getOrThrow(id: Id) {
    const adapter = this.get(id);
    if (!adapter) {
      throwCritical("SOURCE_NOT_FOUND");
    }
    return adapter;
  }

  list() {
    return Array.from(this.sourcesAdapters.values());
  }
}
