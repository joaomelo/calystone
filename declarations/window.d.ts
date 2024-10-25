import { type Store } from "@/data";

declare global {
  interface Window {
    $store: Store;
  }
}