import {
  Tagger,
  TodoArtifact
} from "@/domain/artifact";

export const options = {
  ignoreLocation: true,
  includeScore: true,
  keys: [
    {
      name: "name",
      weight: 2
    },
    {
      name: "content",
      weight: 1.5
    },
    {
      name: "details",
      weight: 1.5
    },
    {
      getFn: (obj: unknown): string[] => {
        if (!(obj instanceof TodoArtifact)) return [];
        const tagger = new Tagger(obj.tags);
        return tagger.labels();
      },
      name: "tags",
      weight: 1,
    },
    {
      name: "mime.type",
      weight: 0.5
    },
    {
      name: "mime.media",
      weight: 0.5
    },
  ],
  shouldSort: true,
  threshold: 0.3,
  useExtendedSearch: true,
};