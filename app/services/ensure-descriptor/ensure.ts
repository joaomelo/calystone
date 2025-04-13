import type { Directory } from "@/domain";

export interface EnsureDescriptorService {
  ensure(directory: Directory): Promise<void>;
}