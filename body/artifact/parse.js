import { appError, asDate, isId } from "@lib";

export const contentFields = ["name", "notes", "start", "end"];

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
