import type { Store } from "@/display";
import type { Logger } from "@/utils";

declare global {
  interface Window {
    $store: Store;
    $logger: Logger;
  }
}