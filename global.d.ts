import { type Store } from "@data";

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare global {
  interface Window {
    $store: Store;
  }
}