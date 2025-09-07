import type { Id } from "@/domain";

import { Descriptor } from "@/domain";

import type { FileFixture } from "./fixture";

import { createTextFile } from "./text";

export function createDescriptorFile(parentId: Id): FileFixture {
  const fixture = createTextFile(parentId);
  fixture.options.name = `${Descriptor.descriptorBasename}.txt`;
  return fixture;
}
