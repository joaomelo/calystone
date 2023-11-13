import type { CollectionName } from "@lib";
import type { Driver } from "../driver";

export type To = {
  name: CollectionName;
  driver: Driver;
};
