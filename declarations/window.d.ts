import { type Store } from "@/display";

declare global {
  interface Window {
    $store: Store;
  }
}