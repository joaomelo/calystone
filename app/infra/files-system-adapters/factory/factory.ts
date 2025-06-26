import type { Nodes } from "@/domain";
import type { SourceProvider } from "@/infra/source";

import { isObjectLike, throwCritical } from "@/utils";

import type { FileSystemAdapter } from "../file-system";
import type { FileSystemConfiguration } from "./configuration";

import { DropboxFileSystemAdapter } from "../dropbox";
import { FsaFileSystemAdapter } from "../fsa";
import { MemoryFileSystemAdapter } from "../memory";
import { OneDriveFileSystemAdapter } from "../one-drive";

export class FileSystemAdaptersFactory {
  private readonly configurations: FileSystemConfiguration;

  constructor(configurations: FileSystemConfiguration) {
    this.configurations = configurations;
  }

  create(options: { accessData: unknown, nodes: Nodes; provider: SourceProvider }): FileSystemAdapter {
    const { accessData, nodes, provider } = options;

    switch (provider) {
      case "dropbox":{
        if (!isObjectLike(accessData)
          || (!("accessToken" in accessData))
          || typeof accessData.accessToken !== "string"
        ) {
          throwCritical("DROPBOX_ACCESS_DATA_NOT_FOUND");
        }
        return new DropboxFileSystemAdapter({ accessToken: accessData.accessToken, nodes });
      }
      case "fsa":{
        if (!isObjectLike(accessData)
          || (!("rootHandle" in accessData))
          || (!(accessData.rootHandle instanceof FileSystemDirectoryHandle))
        ) {
          throwCritical("FSA_ACCESS_DATA_NOT_FOUND");
        }
        return new FsaFileSystemAdapter({ nodes, rootHandle: accessData.rootHandle });
      }
      case "memory": {
        if (!isObjectLike(accessData)
          || (!("rootDirectoryName" in accessData))
          || typeof accessData.rootDirectoryName !== "string"
        ) {
          throwCritical("MEMORY_ACCESS_DATA_NOT_FOUND");
        }
        const delayInMilliseconds = this.configurations.memory.delayInMilliseconds;
        return new MemoryFileSystemAdapter({ delayInMilliseconds, nodes, rootDirectoryName: accessData.rootDirectoryName });
      }
      case "oneDrive":{
        if (!isObjectLike(accessData)
          || (!("accessToken" in accessData))
          || typeof accessData.accessToken !== "string"
        ) {
          throwCritical("ONE_DRIVE_ACCESS_DATA_NOT_FOUND");
        }
        return new OneDriveFileSystemAdapter({ accessToken: accessData.accessToken, nodes });
      }
    }
  }
}
