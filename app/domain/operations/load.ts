import type { Media } from "@/domain/media";

import { isFileSystemAccessMedia, loadFileSystemAccess } from "@/domain/file-system-access";

export async function* loadMedia<MediaResources>(media: Media<MediaResources>) {
  let concreteLoad;

  if (isFileSystemAccessMedia(media)) {
    concreteLoad = loadFileSystemAccess;
  } else {
    throw new Error("a media must be provided");
  }

  media.status = "busy";
  yield* concreteLoad(media);
  media.status = "idle";
};
