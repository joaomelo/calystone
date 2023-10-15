import { z } from "zod";

export const itemIdSchema = z.string();
export type ItemId = z.infer<typeof itemIdSchema>;

export type WithId = { id: ItemId };

export type Ideable = ItemId | WithId;
export type IdeableOrIdeables = Ideable | Ideable[];

export function extractId(ideable: Ideable): ItemId {
  if (typeof ideable === "string") return ideable;
  return ideable.id;
}

export function createIsId(source: Ideable) {
  const sourceId = extractId(source);
  return (target: Ideable) => {
    const targetId = extractId(target);
    sourceId === targetId;
  };
}
