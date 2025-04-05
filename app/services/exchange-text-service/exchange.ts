import type { Artifact } from "@/domain";

export interface ExchangeTextService {
  fetch(artifact: Artifact): Promise<string>
  post(options: { artifact: Artifact; text: string }): Promise<void>
}
