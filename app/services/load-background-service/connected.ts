import type { LoadBackgroundService } from "./load";

export class ConnectedLoadBackgroundService implements LoadBackgroundService{

  start(): void {
    console.log("start");
  }

  stop(): void {
    console.log("stop");
  }

}