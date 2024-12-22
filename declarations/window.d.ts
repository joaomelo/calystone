import { type Store } from "@/display";

declare global {
  interface Window {
    $state: Store;
  }
}