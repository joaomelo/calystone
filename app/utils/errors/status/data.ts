export interface FailData {
  ok: false;
  cause: string;
}

export interface OkData {
  ok: true;
}

export type StatusData = FailData | OkData;
