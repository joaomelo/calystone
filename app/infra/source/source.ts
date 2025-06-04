export interface Source {
  origin: SourceOrigin;
  provider: SourceProvider;
}

export type SourceOrigin = "local" | "network";
export type SourceProvider = "dropbox" | "fsa" | "memory" | "oneDrive";

type Sources = Record<SourceProvider, Source>;

export const sources: Sources = {
  dropbox: {
    origin: "network",
    provider: "dropbox",
  },
  fsa: {
    origin: "local",
    provider: "fsa",
  },
  memory: {
    origin: "local",
    provider: "memory",
  },
  oneDrive: {
    origin: "network",
    provider: "oneDrive",
  },
} as const;