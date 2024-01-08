import { appError } from "@lib";

export function atLeastOneField(payload, fields = []) {
  const hasData = fields.some(field => payload[field] !== undefined);
  if (!hasData) {
    appError({
      code: "AT_LEAST_ONE_FIELD",
      message: `payload needs data or "null" for at least one of these fields: ${fields.join(", ")}`,
      meta: { fields, payload },
    });
  }
}
