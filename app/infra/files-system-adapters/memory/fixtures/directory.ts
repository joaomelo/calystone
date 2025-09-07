import type { Id } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import type { DirectoryFixture } from "./fixture";

export function createDirectory(parentId: Id): DirectoryFixture {
  const names = faker.system.directoryPath().split("/").filter(Boolean);
  const name = faker.helpers.arrayElement(names);

  const options = {
    id: createId(),
    lastModified: faker.date.recent().getTime(),
    name,
    parentId
  };

  return {
    metadata: undefined,
    options,
  };
}
