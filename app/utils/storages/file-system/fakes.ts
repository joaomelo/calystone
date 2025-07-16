import { faker } from "@faker-js/faker";

export function fakeDirectory() {
  const options = faker.system.directoryPath().split("/").filter(Boolean);
  return {
    lastModified: faker.date.recent().getTime(),
    name: faker.helpers.arrayElement(options),
  };
}

export function fakeFile(type?: string) {
  const textContent = faker.lorem.paragraphs({
    max: 5,
    min: 1
  });
  const bytes = new TextEncoder().encode(textContent);
  const content = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(content);
  view.set(bytes);
  return {
    content,
    lastModified: faker.date.recent().getTime(),
    name: faker.system.commonFileName(type),
    size: content.byteLength,
  };
}
