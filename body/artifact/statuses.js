export const ARTIFACT_STATUSES = {
  ACTIVE: "active",
  COMPLETE: "complete",
  CANCELLED: "cancelled",
};

export function isActive({ status }) {
  return status === ARTIFACT_STATUSES.ACTIVE;
}

export function isFinished(artifact) {
  return isComplete(artifact) || isCancelled(artifact);
}

export function isComplete({ status }) {
  return status === ARTIFACT_STATUSES.COMPLETE;
}

export function isCancelled({ status }) {
  return status === ARTIFACT_STATUSES.CANCELLED;
}
