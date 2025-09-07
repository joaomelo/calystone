import type { Id } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import type { FileFixture } from "./fixture";

export function createTextFile(parentId: Id): FileFixture {
  const extensions = [ "txt", "md" ];
  const extension = faker.helpers.arrayElement(extensions);
  const name = faker.system.commonFileName(extension);

  const textContent = faker.lorem.paragraphs({
    max: 5,
    min: 1
  });
  const bytes = new TextEncoder().encode(textContent);
  const content = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(content);
  view.set(bytes);

  const metadata = content;
  const options = {
    id: createId(),
    lastModified: faker.date.recent().getTime(),
    name,
    parentId,
    size: content.byteLength
  };

  return {
    metadata,
    options
  };
}
