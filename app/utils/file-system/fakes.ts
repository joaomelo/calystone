import { faker } from "@faker-js/faker";

type Kind = typeof kinds[number];
const kinds = ["file", "directory"] as const;

export function fakeDirectory() {
  const options = faker.system.directoryPath().split("/").filter(Boolean);
  return {
    lastModified: faker.date.recent().getTime(),
    name: faker.helpers.arrayElement(options),
  };
}

export function fakeFile(type?: string) {
  const textContent = faker.lorem.paragraphs({ max: 5, min: 1 });
  const bytes = new TextEncoder().encode(textContent);
  const content = new ArrayBuffer(bytes.length);
  return {
    content,
    lastModified: faker.date.recent().getTime(),
    name: faker.system.commonFileName(type),
    size: content.byteLength,
  };
}

export function fakeFileSystemEntry(kind?: Kind) {
  const finalKind: Kind = kind ?? faker.helpers.arrayElement(kinds);
  return finalKind === "file" ? fakeFile() : fakeDirectory();
}