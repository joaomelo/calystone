import type {
  Directory,
  DirectoryOptions
} from "@/domain";

import { createId } from "@/domain";
import { fakeDirectory } from "@/utils";
import { faker } from "@faker-js/faker";

import type { ArtifactOrDirectoryOptions } from "../file-system";

export function createFixtures(parent: Directory) {
  const childrenData: ArtifactOrDirectoryOptions[] = [];

  const maxSubdirectories = 3;
  const minSubdirectories = parent.isRoot() ? 2 : 0;
  const howManySubdirectories = faker.helpers.rangeToNumber({
    max: maxSubdirectories,
    min: minSubdirectories
  });

  const subDirectories = createSubdirectories({
    howMany: howManySubdirectories,
    parent
  });
  childrenData.push(...subDirectories);

  return childrenData;
}

function createSubdirectories({
  howMany,
  parent
}: {
  howMany: number,
  parent: Directory
}) {
  const subDirectoriesData: DirectoryOptions[] = [];

  for (let i = 0; i < howMany; i++) {
    const id = createId();
    const entry = fakeDirectory();
    subDirectoriesData.push({
      id,
      parentId: parent.id,
      ...entry
    });
  }

  return subDirectoriesData;
}