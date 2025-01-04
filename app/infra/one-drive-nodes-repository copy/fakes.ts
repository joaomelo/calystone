import type { ArtifactData, Id, Kind, NodeDataAndKind } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

export function fakeArtifactData(): ArtifactData {
  const textContent = faker.lorem.paragraphs({ max: 5, min: 1 });
  const bytes = new TextEncoder().encode(textContent);
  const content = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(content);
  view.set(bytes);

  const size = content.byteLength;
  const lastModified = faker.date.recent().getTime();
  return { content, lastModified, size };
}

export function fakeTextArtifact(parentId: Id): NodeDataAndKind {
  const childId = createId();
  const kind: Kind = "artifact";
  const name = faker.system.commonFileName("txt");
  return { id: childId, kind, name, parentId };
}

export function fakeNode(parentId: Id, kind?: Kind): NodeDataAndKind {
  const childId = createId();
  const finalKind: Kind = kind ?? faker.helpers.arrayElement(["artifact", "directory"]);
  const name = kind === "artifact"
    ? faker.system.commonFileName()
    : fakeDirectoryName();
  return { id: childId, kind: finalKind, name, parentId };
}

export function fakeDirectoryName(): string {
  const options = faker.system.directoryPath().split("/").filter(Boolean);
  return faker.helpers.arrayElement(options);
}
