import type { File } from "@/domain/artifact";

export interface FileText extends File {
  mime: TextMime;
}

export type TextMime = `text/${string}`;
