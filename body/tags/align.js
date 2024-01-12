import { mutate } from "@lib";

import { listTags, listTagsOf } from "./list";

export function alignTagsFor(dependencies, { artifactId, tagsIds }) {
  const allTags = listTags(dependencies);

  const newTags = allTags.filter(({ id }) => tagsIds.includes(id));
  const newTagsIds = newTags.map(({ id }) => id);

  const currentTags = listTagsOf(dependencies, artifactId);
  const currentTagsIds = currentTags.map(({ id }) => id);

  const manifests = [];
  const pushToManifest = (id, artifactsIds) =>
    manifests.push({
      data: { artifactsIds, id },
      method: "put",
      name: "tags",
    });

  currentTags.forEach((currentTag) => {
    if (!newTagsIds.includes(currentTag.id)) {
      const artifactsIds = currentTag
        .artifactsIds
        .filter(id => id !== artifactId);
      pushToManifest(currentTag.id, artifactsIds);
    }
  });

  newTags.forEach((newTag) => {
    if (!currentTagsIds.includes(newTag.id)) {
      const artifactsIds = newTag
        .artifactsIds.concat(artifactId);
      pushToManifest(newTag.id, artifactsIds);
    }
  });

  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}
