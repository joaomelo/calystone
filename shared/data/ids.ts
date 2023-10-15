import { z } from "zod";

export const itemIdSchema = z.string();
export type ItemId = z.infer<typeof itemIdSchema>;

export type WithId = { id: ItemId };

export type IdableOrIdables = Idable | Idable[];
export type Idable = ItemId | WithId;

export function extractId(Idable: Idable): ItemId {
  if (typeof Idable === "string") return Idable;
  return Idable.id;
}
