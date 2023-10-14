import type { CollectionName } from "@shared";
import type { Driver } from "../driver";

export type To = {
  name: CollectionName;
  driver: Driver;
};
