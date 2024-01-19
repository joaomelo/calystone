import { arrayAdd, arrayDel, mutate } from "@lib";

import { listTags } from "./tags";
import { listTagsOf } from "./tags-of";

export function alignTagsFor(dependencies, { artifactId, tagsIds }) {
  const manifests = alignTagsForManifests(dependencies, { artifactId, tagsIds });
  const { mutator } = dependencies;
  return mutate(mutator, manifests);
}

export function alignTagsForManifests(dependencies, { artifactId, tagsIds }) {
  const allTags = listTags(dependencies);

  const newTags = allTags.filter(({ id }) => tagsIds.includes(id));
  const newTagsIds = tagsIds;

  const currentTags = listTagsOf(dependencies, artifactId);
  const currentTagsIds = currentTags.map(({ id }) => id);

  const manifests = [];
  const pushToManifest = (id, artifactsIds) =>
    manifests.push({
      data: { artifactsIds, id },
      method: "put",
      name: "tags",
    });

  const { mutator } = dependencies;
  currentTags.forEach((currentTag) => {
    // if this current tag of the artifact is not present in the list of new tags for the artifact then it should be updated.
    if (!newTagsIds.includes(currentTag.id)) {
      // the tag will need a manifest that updates its artifacts to exclude the one in case
      const artifactsIds = arrayDel(mutator, artifactId);
      pushToManifest(currentTag.id, artifactsIds);
    }
  });

  newTags.forEach((newTag) => {
    // if the new tag for the artifact is not already present in the current list of tags linked to the artifact it should be updated
    if (!currentTagsIds.includes(newTag.id)) {
      // the tag will need a manifest that updates its artifacts to include the one in case
      const artifactsIds = arrayAdd(mutator, artifactId);
      pushToManifest(newTag.id, artifactsIds);
    }
  });

  return manifests;
}
