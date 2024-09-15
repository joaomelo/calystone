import { Artifact } from '@data/artifacts'

export async function loadArtifacts(handle: FileSystemDirectoryHandle): Promise<Artifact[]> {
  const rootLevel: Artifact[] = [];

  const entries = handle.values();
  for await (const entry of entries) {
    const { name, kind } = entry;
    const artifact = new Artifact(name, kind);
    rootLevel.push(artifact);

    if (kind === "directory") {
      const entryHandle = await entry.getDirectoryHandle(name);
      await loadChildren(entryHandle, artifact);
    }
  }

  return rootLevel;
}

async function loadChildren(handle: FileSystemDirectoryHandle, parent: Artifact): Promise<void> {
  const entries = handle.values();
  for await (const entry of entries) {
    const { name, kind } = entry;
    const artifact = new Artifact(name, kind, parent);
    if (kind === "directory") {
      const entryHandle = await entry.getDirectoryHandle(name);
      await loadChildren(entryHandle, artifact);
    }
  }
}