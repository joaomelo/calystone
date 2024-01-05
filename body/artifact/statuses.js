export const ARTIFACT_STATUSES = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export function isActive({ status }) {
  return status === ARTIFACT_STATUSES.ACTIVE;
}

export function isFinished(artifact) {
  return isCompleted(artifact) || isCancelled(artifact);
}

export function isCompleted({ status }) {
  return status === ARTIFACT_STATUSES.COMPLETED;
}

export function isCancelled({ status }) {
  return status === ARTIFACT_STATUSES.CANCELLED;
}
