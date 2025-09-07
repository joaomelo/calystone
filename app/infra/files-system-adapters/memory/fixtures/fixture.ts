import type {
  ArtifactOptions,
  DirectoryOptions
} from "@/domain";

export interface DirectoryFixture {
  metadata: undefined
  options: DirectoryOptions
}

export interface FileFixture {
  metadata: ArrayBuffer
  options: ArtifactOptions
}

export type Fixture = DirectoryFixture | FileFixture;