import { Artifact, Directory, File } from "@/domain/artifact";
import { describe, expect, it, vi } from "vitest";

import { load } from "./load";

interface MockFileEntry {
  getFile: () => Promise<Blob>;
  kind: "file";
  name: string;
}

interface MockDirectoryEntry {
  kind: "directory";
  name: string;
  values: () => AsyncIterableIterator<MockDirectoryEntry | MockFileEntry>;
}

interface MockFileSystemDirectoryHandle {
  values: () => AsyncIterableIterator<MockDirectoryEntry | MockFileEntry>;
}

async function* createAsyncIterable<T>(items: T[]): AsyncIterableIterator<T> {
  for await (const item of items) {
    yield item;
  }
}

describe("load function", () => {
  it("should yield artifacts for files", async () => {
    const mockFileEntry: MockFileEntry = {
      getFile: vi.fn().mockResolvedValue(new Blob(["file content"])),
      kind: "file",
      name: "file1.txt",
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: () => createAsyncIterable([mockFileEntry]),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(1);
    expect(artifacts[0]).toBeInstanceOf(File);
    expect(artifacts[0].name).toBe(mockFileEntry.name);
  });

  it("should yield artifacts for directories", async () => {
    const mockDirectoryEntry: MockDirectoryEntry = {
      kind: "directory",
      name: "sub-dir",
      values: () => createAsyncIterable([]),
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: () => createAsyncIterable([mockDirectoryEntry]),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(1);
    expect(artifacts[0]).toBeInstanceOf(Directory);
    expect(artifacts[0].name).toBe(mockDirectoryEntry.name);
  });

  it("should handle nested directories", async () => {
    const mockFileEntry: MockFileEntry = {
      getFile: vi.fn().mockResolvedValue(new Blob(["file content"])),
      kind: "file",
      name: "file1.txt",
    };

    const mockNestedDirectoryEntry: MockDirectoryEntry = {
      kind: "directory",
      name: "nested",
      values: () => createAsyncIterable([mockFileEntry]),
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: () => createAsyncIterable([mockNestedDirectoryEntry]),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(2);
    expect(artifacts[0].name).toBe(mockNestedDirectoryEntry.name);
    expect(artifacts[0]).toBeInstanceOf(Directory);
    expect(artifacts[1].name).toBe(mockFileEntry.name);
    expect(artifacts[1]).toBeInstanceOf(File);
  });
});
