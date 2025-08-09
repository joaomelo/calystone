import type {
  ArtifactOptions,
  Directory,
  DirectoryOptions
} from "@/domain";

import {
  asCriterionValue,
  createId,
  Descriptor,
  TodoArtifact
} from "@/domain";
import {
  fakeDirectory,
  fakeFile
} from "@/utils";
import { faker } from "@faker-js/faker";

interface DirectoryFixture {
  metadata: undefined
  options: DirectoryOptions
}

interface FileFixture {
  metadata: ArrayBuffer
  options: ArtifactOptions
}

type Fixture = DirectoryFixture | FileFixture;

export function createFixtures(parent: Directory): Fixture[] {
  const childrenData: Fixture[] = [];

  const subDirectories = createSubdirectories(parent);
  childrenData.push(...subDirectories);

  const descriptorFile = createDescriptorFile(parent);
  if (descriptorFile) {
    childrenData.push(descriptorFile);
  }

  const binaries = createOrdinaryFiles(parent);
  childrenData.push(...binaries);

  const todos = createTodoFiles(parent);
  childrenData.push(...todos);

  return childrenData;
}

export function isFileFixture(fixture: Fixture): fixture is FileFixture {
  return fixture.metadata !== undefined;
}

function createDescriptorFile(parent: Directory) {
  const hasDescriptorFile = parent.isRoot() || faker.datatype.boolean();
  if (!hasDescriptorFile) return;

  const descriptorFile = fakeFile("txt");
  descriptorFile.name = `${Descriptor.descriptorBasename}.txt`;
  const descriptorFileId = createId();
  return {
    metadata: descriptorFile.content,
    options: {
      id: descriptorFileId,
      parentId: parent.id,
      ...descriptorFile
    }
  };
}

function createOrdinaryFiles(parent: Directory) {
  const fixtures: Fixture[] = [];

  const extensionsToUse = ["txt", "exe"];
  const howManyMoreExtensions = faker.helpers.rangeToNumber({
    max: 5,
    min: 3
  });
  for (let i = 0; i < howManyMoreExtensions; i++) {
    extensionsToUse.push(faker.helpers.arrayElement([ "txt", "md", "exe", "bin", "dll", "pdf", "jpg", "png", "zip", "csv", "json", "xml", "docx", "xlsx", "pptx" ]));
  }

  for (const extension of extensionsToUse) {
    const id = createId();
    const binaryFile = fakeFile(extension);
    fixtures.push({
      metadata: binaryFile.content,
      options: {
        id,
        parentId: parent.id,
        ...binaryFile
      }
    });
  }

  return fixtures;
}

function createSubdirectories(parent: Directory) {
  const subdirectories: Fixture[] = [];

  const maxSubdirectories = 3;
  const minSubdirectories = parent.isRoot() ? 2 : 0;
  const howManySubdirectories = faker.helpers.rangeToNumber({
    max: maxSubdirectories,
    min: minSubdirectories
  });

  for (let i = 0; i < howManySubdirectories; i++) {
    const id = createId();
    const entry = fakeDirectory();
    subdirectories.push({
      metadata: undefined,
      options: {
        id,
        parentId: parent.id,
        ...entry
      }
    });
  }

  return subdirectories;
}

function createTodoFiles(parent: Directory) {
  const fixtures: Fixture[] = [];

  const howManyTodos = faker.helpers.rangeToNumber({
    max: 5,
    min: 2
  });

  for (let i = 0; i < howManyTodos; i++) {
    const id = createId();
    const {
      lastModified,
      name,
    } = fakeFile("todo");

    const options: ArtifactOptions = {
      id,
      lastModified,
      name,
      parentId: parent.id,
      size: 0
    };
    const todo = new TodoArtifact(options);
    feedCriteria(todo);

    fixtures.push({
      metadata: todo.toBinary(),
      options
    });
  }

  return fixtures;
}

function feedCriteria(todo: TodoArtifact) {
  const howManyCriteria = faker.helpers.rangeToNumber({
    max: 3,
    min: 0
  });

  for (let i = 0; i < howManyCriteria; i++) {
    const label = faker.helpers.arrayElement([
      "urgency",
      "impact",
      "effort",
      "risk",
      "value",
      "complexity",
      "clarity",
      "deadline",
      "importance",
      "feasibility"
    ]);
    const value = asCriterionValue(faker.number.float({
      fractionDigits: 2,
      max: 1,
      min: 0
    }));
    todo.updateCriterion({
      label,
      value
    });
  }
}
