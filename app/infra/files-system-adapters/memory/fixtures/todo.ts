import type {
  ArtifactOptions,
  Id
} from "@/domain";

import {
  asCriterionValue,
  createId,
  TodoArtifact
} from "@/domain";
import { faker } from "@faker-js/faker";

import type { FileFixture } from "./fixture";

export function createTodoFile(parentId: Id): FileFixture {
  const id = createId();
  const name = faker.system.commonFileName("todo");
  const lastModified = faker.date.recent().getTime();

  const options: ArtifactOptions = {
    id,
    lastModified,
    name,
    parentId,
    size: 0
  };

  const todo = new TodoArtifact(options);
  feedCriteria(todo);
  feedTags(todo);

  const metadata = todo.toBinary();

  return {
    metadata,
    options
  };
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

function feedTags(todo: TodoArtifact) {
  const howManyTags = faker.helpers.rangeToNumber({
    max: 3,
    min: 0
  });

  for (let i = 0; i < howManyTags; i++) {
    const label = faker.helpers.arrayElement([
      "cycle",
      "next action",
      "now",
      "work",
      "personal",
      "delegated",
      "blocked",
      "automatic",
    ]);
    todo.tagger.add(label);
  }
}
