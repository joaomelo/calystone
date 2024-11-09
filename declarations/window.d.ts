import { type Store } from "@/domain";

declare global {
  interface Window {
    $store: Store;
  }
}