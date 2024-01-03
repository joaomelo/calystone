export const ARTIFACT_STATUSES = {
  ACTIVE: "active",
  COMPLETE: "complete",
  CLOSED: "closed",
};

export function isActive({ status }) {
  return status === ARTIFACT_STATUSES.ACTIVE;
}

export function isComplete({ status }) {
  return status === ARTIFACT_STATUSES.COMPLETE;
}

export function isClosed({ status }) {
  return status === ARTIFACT_STATUSES.CLOSED;
}
