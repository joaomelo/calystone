import type { Id } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import type { FileFixture } from "./fixture";

export function createBinaryFile(parentId: Id): FileFixture {
  const id = createId();
  const lastModified = faker.date.recent().getTime();

  const extensions = [ "exe", "bin", "dll", "jpg", "png", "zip", "csv", "json", "xml", "docx", "xlsx", "pptx" ];
  const extension = faker.helpers.arrayElement(extensions);
  const name = faker.system.commonFileName(extension);

  const fakeContent = faker.lorem.paragraphs({
    max: 5,
    min: 1
  });
  const bytes = new TextEncoder().encode(fakeContent);
  const metadata = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(metadata);
  view.set(bytes);

  const options = {
    id,
    lastModified,
    name,
    parentId,
    size: 0
  };

  return {
    metadata,
    options,
  };
}
