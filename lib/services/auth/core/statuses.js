// there is no unsolved status anymore. the solve function is an async promise, so it must always return a resolved status.

export const AUTH_STATUSES = {
  SIGNED_IN: "AUTH_STATUSES.SIGNED_IN",
  SIGNED_OUT: "AUTH_STATUSES.SIGNED_OUT",
};

export function authStatus(auth) {
  return auth.solveStatus();
}
