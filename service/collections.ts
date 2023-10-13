export const COLLECTIONS_NAMES = ["artifacts"] as const;
export type CollectionName = (typeof COLLECTIONS_NAMES)[number];
