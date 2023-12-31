import { isId, asDate, appError } from "@lib";

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

export function parseContent(payload) {
  const { name = null, notes = null } = payload;

  const { start, end } = parseDates(payload);

  return { start, end, name, notes };
}

function parseDates(payload) {
  const { start: startUser = null, end: endUser = null } = payload;

  const start = asDate(startUser);

  let end = asDate(endUser);
  if (start && !end) end = start;
  if (start > end) end = start;

  return { start, end };
}
