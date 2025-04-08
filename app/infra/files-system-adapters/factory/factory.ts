import type { Options } from "./options";

import { DropboxFileSystemAdapter } from "../dropbox";
import { FsaFileSystemAdapter } from "../fsa";
import { MemoryFileSystemAdapter } from "../memory";
import { OneDriveFileSystemAdapter } from "../one-drive";

export class FilesSystemAdaptersFactory {

  create(options: Options) {
    switch (options.source) {
      case "dropbox":
        return new DropboxFileSystemAdapter(options.token);
      case "fsa":
        return new FsaFileSystemAdapter(options.rootHandle);
      case "memory":
        return new MemoryFileSystemAdapter(options);
      case "one-drive":
        return new OneDriveFileSystemAdapter(options.token);
    }
  }
}
