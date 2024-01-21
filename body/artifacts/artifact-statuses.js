export const ARTIFACT_STATUSES = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
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
