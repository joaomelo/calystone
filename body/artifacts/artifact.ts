import { z } from "zod";
import { itemFieldsSchema } from "@shared";

const statuses = ["active", "completed"] as const;

export const artifactFieldsSchema = z.object({
  name: z.string(),
  notes: z.nullable(z.string()).default(null),
  parentId: z.nullable(z.string()).default(null),
  status: z.enum(statuses).default("active"),
});
export type ArtifactFields = z.infer<typeof artifactFieldsSchema>;
export type ArtifactPayload = Partial<ArtifactFields>;

export const artifactSchema = artifactFieldsSchema.merge(itemFieldsSchema);
export type Artifact = z.infer<typeof artifactSchema>;
