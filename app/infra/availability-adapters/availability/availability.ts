import type { Status } from "@/utils";

export abstract class AvailabilityAdapter {
  abstract available(): Status;
}