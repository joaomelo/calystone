import { Source } from "../source";

export class WebRtc extends Source{
  refresh(): Promise<void> {
    return Promise.resolve();
  }
};