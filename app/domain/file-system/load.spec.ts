import type { Artifact } from "@/domain/artifact";

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

describe("load function", () => {
  it("should yield artifacts for files", async () => {
    const mockFileEntry: MockFileEntry = {
      getFile: vi.fn().mockResolvedValue(new Blob(["file content"])),
      kind: "file",
      name: "file1.txt",
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: vi.fn().mockResolvedValue([mockFileEntry][Symbol.iterator]()),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(1);
    expect(artifacts[0].name).toBe(mockFileEntry.name);
    expect(artifacts[0].type).toBe(mockFileEntry.kind);
  });

  it("should yield artifacts for directories", async () => {
    const mockDirectoryEntry: MockDirectoryEntry = {
      kind: "directory",
      name: "sub-dir",
      values: vi.fn().mockResolvedValue([][Symbol.iterator]()),
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: vi.fn().mockResolvedValue([mockDirectoryEntry][Symbol.iterator]()),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(1);
    expect(artifacts[0].name).toBe(mockDirectoryEntry.name);
    expect(artifacts[0].type).toBe(mockDirectoryEntry.kind);
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
      values: vi.fn().mockResolvedValue([mockFileEntry][Symbol.iterator]()),
    };

    const mockRootHandle: MockFileSystemDirectoryHandle = {
      values: vi.fn().mockResolvedValue([mockNestedDirectoryEntry][Symbol.iterator]()),
    };

    const artifacts: Artifact[] = [];
    for await (const artifact of load(mockRootHandle as FileSystemDirectoryHandle)) {
      artifacts.push(artifact);
    }

    expect(artifacts).toHaveLength(2);
    expect(artifacts[0].name).toBe(mockNestedDirectoryEntry.name);
    expect(artifacts[0].type).toBe(mockNestedDirectoryEntry.kind);
    expect(artifacts[1].name).toBe(mockFileEntry.name);
    expect(artifacts[1].type).toBe(mockFileEntry.kind);
  });
});
