import { appError, asDate, isId } from "@lib";

export function atLeastOneField(payload) {
  const contentFields = ["name", "notes", "start", "end"];
  const hasMinimalContent = contentFields.some(field => payload[field] !== undefined);
  if (!hasMinimalContent) {
    appError({
      code: "AT_LEAST_ONE_FIELD",
      message: `payload needs data or "null" for at least one of the artifact's content fields: ${contentFields.join(", ")}`,
      meta: { payload },
    });
  }
}

export function parseParent(payload) {
  const { parentId = null } = payload;
  if (parentId !== null && !isId(parentId)) {
    appError({
      code: "INVALID_PARENT_ID",
      message: "parentId must be null or an valid id",
      meta: { parentId },
    });
  }
  return parentId;
}

export function parseDates(payload) {
  const { start: startUser = null, end: endUser = null } = payload;

  const start = asDate(startUser);

  let end = asDate(endUser);
  if (start && !end) end = start;
  if (start > end) end = start;

  return { start, end };
}
