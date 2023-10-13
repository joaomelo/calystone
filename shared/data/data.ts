import { z } from "zod";

const valueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.date(),
  z.null(),
]);
const payloadSchema = z.record(z.string().min(1), valueSchema);
export type Payload = z.infer<typeof payloadSchema>;

const itemIdSchema = z.string();
export type ItemId = z.infer<typeof itemIdSchema>;

export const itemFieldsSchema = z.object({
  id: itemIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const itemSchema = itemFieldsSchema.catchall(payloadSchema);
export type Item = z.infer<typeof itemSchema>;

export type WithIdOrIds = WithId | WithId[];
export type WithId = ItemId | Item;
