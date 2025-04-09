import type { Artifact } from "@/domain";

export interface ExchangeTextService {
  fetchInto(artifact: Artifact): Promise<string>
  postFrom(options: { artifact: Artifact; text: string }): Promise<void>
}
