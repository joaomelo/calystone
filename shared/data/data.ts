import type { WithId } from "./ids";

import { z } from "zod";
import { itemIdSchema } from "./ids";

export type CollectionName = string;

const valueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.date(),
  z.null(),
]);
const payloadSchema = z.record(z.string().min(1), valueSchema);
export type Payload = z.infer<typeof payloadSchema>;

export type PayloadWithId = Payload & WithId;

export const itemFieldsSchema = z.object({
  id: itemIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const itemSchema = itemFieldsSchema.catchall(payloadSchema);
export type Item = z.infer<typeof itemSchema>;
