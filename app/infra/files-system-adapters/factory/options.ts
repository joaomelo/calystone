import type { Source } from "@/infra/source";

export type Options = DropboxOptions | FsaOptions | MemoryOptions | OneDriveOptions;

interface DropboxOptions extends SourceOptions {
  source: "dropbox", token: string
}

interface FsaOptions extends SourceOptions {
  source: "fsa", rootHandle: FileSystemDirectoryHandle
}

interface MemoryOptions extends SourceOptions {
  source: "memory", delayInSeconds: number, rootDirectoryName: string
}

interface OneDriveOptions extends SourceOptions {
  source: "one-drive", token: string
}

interface SourceOptions { source: Source }