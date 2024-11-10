const statues = [ "busy", "idle" ] as const;

export type Status = typeof statues[number];

export function isStatus(status: unknown): status is Status {
  if (typeof status !== "string") return false;
  return statues.some(s => s === status);
}