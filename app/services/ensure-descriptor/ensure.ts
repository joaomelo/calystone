import type { Directory } from "@/domain";
import type { Status } from "@/utils";

export interface EnsureDescriptorService {
  ensure(directory: Directory): Promise<void>;
  missing(directory: Directory): Status;
}